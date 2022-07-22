import { ALL, Body, Controller, Get, Inject, Post } from '@midwayjs/decorator';
import { isEmpty } from 'lodash';
import { res } from '../common/utils';
import { UpdateInfoDto } from '../dto/verity';
import { ResOp } from '../interface';
import { UserService } from '../service/user';
import { VerifyService } from '../service/verify';
import { BaseController } from './base';

@Controller('/user')
export class UserController extends BaseController {
  @Inject()
  userService: UserService;

  @Inject()
  verifyService: VerifyService;

  /**
   * 获取当前用户信息接口
   * @returns
   */
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

  /**
   * 更新用户信息接口
   * @param userInfo
   * @returns
   */
  @Post('/update')
  async updateUserInfo(@Body(ALL) userInfo: UpdateInfoDto): Promise<ResOp> {
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
