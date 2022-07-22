import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UpdateInfoDto } from '../dto/verity';
import User from '../entity/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  /**
   * 根据id查找用户
   * @param id
   * @returns
   */
  async getUserById(id: number): Promise<User | null> {
    return await this.userModel.findOne({
      where: {
        id: id,
      },
    });
  }

  /**
   * 根据用户名查找用户
   * @param username
   * @returns
   */
  async getUserByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: {
        username: username,
      },
    });
  }

  /**
   * 更新用户信息
   * @param userInfo
   * @param user
   * @returns
   */
  async updateUserInfo(userInfo: UpdateInfoDto, user: User): Promise<User> {
    user.username = userInfo.username;
    user.nickname = userInfo.nickname;
    user.email = userInfo.email;
    user.phone = userInfo.phone;
    user.remark = userInfo.remark;
    return await this.userModel.save(user);
  }
}
