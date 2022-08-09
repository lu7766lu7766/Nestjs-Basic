import { Module } from '@nestjs/common';
import { TestController } from './controller/test.controller';

@Module({
  imports: [],
  controllers: [TestController],
})
export class TestModule {}
