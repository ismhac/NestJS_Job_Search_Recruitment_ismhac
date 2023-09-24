import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage, User } from "src/decorator/customize";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RegisterUserDto } from "src/users/dto/create-user.dto";
import { Response } from "express";
import { IUser } from "src/users/users.interface";


@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @Get('/account')
    @ResponseMessage("Get user information success")
    handleGetAccount(@User() user: IUser) { // req.user
        return { user }
    }

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
