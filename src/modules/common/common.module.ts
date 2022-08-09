import { Global, Module } from '@nestjs/common';
import { DB } from './service/db.service';
import { IsNotExistsValidator } from './validator/is-not-exists.validator';
import { IsExistsValidator } from './validator/is-exists.validator';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [AuthModule, UserModule],
  providers: [DB, IsNotExistsValidator, IsExistsValidator],
  exports: [DB, AuthModule, UserModule],
})
export class CommonModule {}
