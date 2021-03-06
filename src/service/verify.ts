import { Inject, Provide } from '@midwayjs/decorator';
import { LoginImageCaptchaDto } from '../dto/verity';
import { IImageCaptchaResult } from './interface';
import * as svgCaptcha from 'svg-captcha';
import { isEmpty } from 'lodash';
import { Utils } from '../common/utils';
import { BaseService } from './base';
import { Repository } from 'typeorm';
import User from '../entity/user';
import { InjectEntityModel } from '@midwayjs/orm';

@Provide()
export class VerifyService extends BaseService {
  @Inject()
  utils: Utils;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  /**
   * 生成图片验证码
   * @param captcha
   * @returns
   */
  async getImgCaptcha(
    captcha: LoginImageCaptchaDto
  ): Promise<IImageCaptchaResult> {
    const svg = svgCaptcha.createMathExpr({
      size: 4,
      color: false,
      noise: 1,
      width: isEmpty(captcha.width) ? 100 : captcha.width,
      height: isEmpty(captcha.height) ? 50 : captcha.width,
    });
    const result = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString(
        `base64`
      )}`,
      id: this.utils.gennerateUUID(),
    };
    await this.getRedis().set(
      `captcha:img:${result.id}`,
      svg.text,
      'EX',
      60 * 10
    );
    return result;
  }

  /**
   * 校验验证码
   * @param id
   * @param code
   * @returns
   */
  async checkImgCaptcha(id: string, code: string): Promise<boolean> {
    const result = await this.getRedis().get(`captcha:img:${id}`);
    if (isEmpty(result)) {
      return false;
    }
    if (code.toLocaleLowerCase() !== result!.toLocaleLowerCase()) {
      return false;
    }
    await this.getRedis().del(`captcha:img:${id}`);
    return true;
  }

  /**
   * 获取token
   * @param username
   * @param password
   * @returns
   */
  async getLoginSign(username: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({
      where: {
        username: username,
        status: 1,
      },
    });
    if (isEmpty(user)) {
      return null;
    }
    if (user!.password !== password) {
      return null;
    }
    const jwtSign = await this.utils.jwtSign({
      uid: parseInt(user!.id.toString()),
    });
    await this.getRedis().set(`admin:token:${user!.id}`, jwtSign);
    return jwtSign;
  }

  /**
   * 验证token
   * @param token
   * @returns
   */
  async verifyToken(token: string): Promise<any> {
    return await this.utils.jwtVerify(token);
  }
}
