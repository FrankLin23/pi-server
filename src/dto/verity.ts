export class LoginImageCaptchaDto {
  width: number;
  height: number;
}

export class LoginInfoDto {
  username: string;
  password: string;
  captchaCode: string;
  captchaId: string;
}

export class UpdateInfoDto {
  username: string | null;
  nickname: string | null;
  email: string | null;
  phone: string | null;
  remark: string | null;
}
