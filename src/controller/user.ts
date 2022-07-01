import { ALL, Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { Context } from 'egg';
import { isEmpty } from 'lodash';
import { res } from '../common/utils';
import { LoginInfoDto, UpdateInfoDto } from '../dto/verity';
import { ResOp } from '../interface';
import { UserService } from '../service/user';
import { VerifyService } from '../service/verify';
import { BaseController } from './base';

@Controller('/user')
export class UserController extends BaseController {
  @Inject()
  verifyService: VerifyService;

  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

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

  @Get('/me')
  async getCurrentUser(): Promise<ResOp> {
    const token = this.ctx.header.authorization;
    if (!token) {
      return res({ code: 11002 });
    }
    const result = await this.verifyService.verifyToken(token);
    if (isEmpty(result)) {
      return res({ code: 11002 });
    }
    const user = await this.userService.getUserById(result.sign.uid);
    const currentUser = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      headImg: user.headImg,
      email: user.email,
      phone: user.phone,
      remark: user.remark,
    };
    return res({ data: currentUser });
  }

  @Post('/update')
  async updateUserInfo(@Body(ALL) userInfo: UpdateInfoDto) {
    const user = await this.userService.getUserByUsername(userInfo.username);
    if (isEmpty(user)) {
      return res({ code: 10014 });
    }
    const result = await this.userService.updateUserInfo(userInfo, user);
    return res({
      data: result,
    });
  }
}
