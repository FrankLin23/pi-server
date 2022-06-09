import { ALL, Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { isEmpty } from 'lodash';
import { res } from '../common/utils';
import { LoginInfoDto } from '../dto/verity';
import { ResOp } from '../interface';
import { VerifyService } from '../service/verify';
import { BaseController } from './base';

@Controller('/user')
export class UserController extends BaseController {
  @Inject()
  verifyService: VerifyService;

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
}
