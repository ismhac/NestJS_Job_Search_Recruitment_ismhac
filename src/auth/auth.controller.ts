import { Controller, Get, Post, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage } from "src/decorator/customize";
import { LocalAuthGuard } from "./local-auth.guard";


@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @ResponseMessage('Login successfully')
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    handleLogin(@Request() req) {
        return this.authService.login(req.user);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
