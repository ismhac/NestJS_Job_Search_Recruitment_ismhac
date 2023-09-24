import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage } from "src/decorator/customize";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RegisterUserDto } from "src/users/dto/create-user.dto";
import { Response } from "express";


@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @Public()
    @Post('register')
    @ResponseMessage('Register a new user success')
    handleRegister(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }


    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @ResponseMessage('Login successfully')
    handleLogin(
        @Req() req,
        @Res({ passthrough: true }) response: Response) {
        return this.authService.login(req.user, response);
    }
}
