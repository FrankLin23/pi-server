import { ALL, Controller, Get, Inject, Query } from '@midwayjs/decorator';
import { res } from '../common/utils';
import { LoginImageCaptchaDto } from '../dto/verity';
import { VerifyService } from '../service/verify';

@Controller('/')
export class LoginController {
  @Inject()
  verifyService: VerifyService;

  @Get('/captcha')
  async captchaByImg(@Query(ALL) captcha: LoginImageCaptchaDto) {
    const result = await this.verifyService.getImgCaptcha(captcha);
    return res({ data: result });
  }
}
