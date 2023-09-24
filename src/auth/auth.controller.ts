import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage, User } from "src/decorator/customize";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RegisterUserDto } from "src/users/dto/create-user.dto";
import { Request, Response } from "express";
import { IUser } from "src/users/users.interface";


@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @Post('/logout')
    @ResponseMessage("Logout User")
    handleLogout(
        @Res({ passthrough: true }) response: Response,
        @User() user: IUser
    ) {
        return this.authService.logout(response, user)
    }

    @Public()
    @Get('/refresh')
    @ResponseMessage("Get user by refresh token")
    handleRefreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) { // req.user
        const refreshToken = request.cookies["refresh_token"];
        return this.authService.processNewToken(refreshToken, response);
    }

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
