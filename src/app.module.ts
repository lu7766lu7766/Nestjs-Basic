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
import { Role } from './models/role';
import { UserModule } from './modules/user/user.module';
import { HidePropInterceptor } from './interceptor/hide-prop.interceptor';
import { LoginModule } from './modules/login/login.module';
import { Permission } from './models/permission';
import { UserController } from './modules/user/controller/user.controller';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const ormConfig = require('./config/database');

@Module({
  imports: [
    AuthModule,
    CommonModule,
    TestModule,
    TypeOrmModule.forRoot({
      ...ormConfig,
      entities: [User, Role, Permission],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UserModule,
    LoginModule,
  ],
  controllers: [AppController, UserController],
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
