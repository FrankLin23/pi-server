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
