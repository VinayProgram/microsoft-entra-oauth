import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './user.service.js';
import type { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    const accessToken = req.user?.access_token;
    if (!accessToken) {
      throw new UnauthorizedException('Access token is required');
    }
    return await this.userService.getUserByAccessToken(accessToken);
  }
}
