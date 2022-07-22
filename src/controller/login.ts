import {
  ALL,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/decorator';
import { isEmpty } from 'lodash';
import { res } from '../common/utils';
import { LoginImageCaptchaDto, LoginInfoDto } from '../dto/verity';
import { ResOp } from '../interface';
import { VerifyService } from '../service/verify';
import { BaseController } from './base';

@Controller('/')
export class LoginController extends BaseController {
  @Inject()
  verifyService: VerifyService;

  /**
   * 登录接口
   * @param loginInfo
   * @returns
   */
  @Post('/login')
  async login(@Body(ALL) loginInfo: LoginInfoDto): Promise<ResOp> {
    const isSuccess = await this.verifyService.checkImgCaptcha(
      loginInfo.captchaId,
      loginInfo.captchaCode
    );
    if (!isSuccess) {
      return res({ code: 10002 });
    }
    const sign = await this.verifyService.getLoginSign(
      loginInfo.username,
      loginInfo.password
    );
    if (isEmpty(sign)) {
      return res({ code: 10003 });
    }
    return res({
      data: {
        token: sign,
      },
    });
  }

  /**
   * 生成验证码接口
   * @param captcha
   * @returns
   */
  @Get('/captcha')
  async captchaByImg(
    @Query(ALL) captcha: LoginImageCaptchaDto
  ): Promise<ResOp> {
    const result = await this.verifyService.getImgCaptcha(captcha);
    return res({ data: result });
  }
}
