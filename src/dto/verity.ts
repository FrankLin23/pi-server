import { ApiProperty } from '@midwayjs/swagger';

export class LoginImageCaptchaDto {
  @ApiProperty()
  width: number;

  @ApiProperty()
  height: number;
}

export class LoginInfoDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  captchaCode: string;

  @ApiProperty()
  captchaId: string;
}

export class UpdateInfoDto {
  @ApiProperty()
  username: string | null;

  @ApiProperty()
  nickname: string | null;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  phone: string | null;

  @ApiProperty()
  remark: string | null;
}
