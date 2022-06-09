import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1651288631903_3586',
    egg: {
      port: 7001,
    },
    orm: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'pi',
      synchronize: false,
      logging: false,
    },
    cors: {
      credentials: false,
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 0,
      },
    },
    jwt: {
      secret: 'xxxxxxx',
      expiresIn: '2d',
    },
    // security: {
    //   csrf: false,
    // },
  } as MidwayConfig;
};
