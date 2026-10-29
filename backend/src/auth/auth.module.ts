import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JWTService } from '../utils/jwt.service.js';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService,JWTService],
  exports: []
})
export class AuthModule {}