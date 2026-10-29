import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UsersService } from './user.service.js';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UsersService],
  exports: []
})
export class UsersModule {}