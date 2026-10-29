import {
    Controller,
    Get,
    Req,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';

import type { Request, Response } from 'express';
import { Public } from '../gaurd/public.decorator.js';
@Controller('/')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Public()
    @Get('login')
    async login() {
        console.log("----login called----");
        return this.authService.loginPKCE();
    }

    @Public()
    @Get('redirect')
    async handleRedirect(@Req() req: Request, @Res() res: Response) {
        console.log("----redirect called----");
        return this.authService.handleRedirect(req, res);
    }

    @Get('auth/is-authenticated')
    async isAuthenticated(@Req() req: Request) {
        return {isAuthenticated: req.user ? true : false};
    }
}
