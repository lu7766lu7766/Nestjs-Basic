import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { ExceptionHandler } from './exception/exception.handler';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { TestModule } from './modules/test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';
import { Post } from './models/post';
import { UserModule } from './modules/user/user.module';
import { HidePropInterceptor } from './interceptor/hide-prop.interceptor';

const ormConfig = require('./config/database');

@Module({
  imports: [
    AuthModule,
    CommonModule,
    TestModule,
    TypeOrmModule.forRoot({
      ...ormConfig,
      entities: [User, Post],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HidePropInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {}
}
