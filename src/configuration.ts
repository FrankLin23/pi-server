import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as egg from '@midwayjs/web';
import * as orm from '@midwayjs/orm';
import * as cache from '@midwayjs/cache';
import * as crossDomain from '@midwayjs/cross-domain';
import * as redis from '@midwayjs/redis';
import * as passport from '@midwayjs/passport';
import * as jwt from '@midwayjs/jwt';
import * as swagger from '@midwayjs/swagger';

@Configuration({
  imports: [egg, orm, cache, crossDomain, redis, passport, jwt, swagger],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}
