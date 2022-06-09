import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { nanoid } from 'nanoid';
import { ResOp } from '../interface';
import ErrorConstants from './error_constants';
import * as CryptoJS from 'crypto-js';
import { JwtService } from '@midwayjs/jwt';

@Provide()
@Scope(ScopeEnum.Singleton)
export class Utils {
  @Inject()
  jwtService: JwtService;

  gennerateUUID(): string {
    return nanoid();
  }

  md5(msg: string): string {
    return CryptoJS.MD5(msg).toString();
  }

  async jwtSign(sign: any, options?: any): Promise<string> {
    return await this.jwtService.sign({ sign });
  }

  async jwtVerify(token: string, options?: any): Promise<any> {
    return await this.jwtService.verify(token);
  }
}

export function res(op?: ResOp): ResOp {
  return {
    data: op?.data ?? null,
    code: op?.code ?? 200,
    message: op?.code
      ? getErrorMessageByCode(op!.code) || op?.message || 'unknown error'
      : op?.message || 'success',
  };
}

export function getErrorMessageByCode(code: number): string {
  return ErrorConstants[code];
}
