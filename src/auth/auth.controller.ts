import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { Request, Response } from "express";
import { Public, ResponseMessage, User } from "src/decorator/customize";
import { RolesService } from "src/roles/roles.service";
import { RegisterUserDto, UserLoginDto } from "src/users/dto/create-user.dto";
import { IUser } from "src/users/users.interface";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { CreateCompanyDto } from "src/companies/dto/create-company.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private roleService: RolesService,
        // private
    ) { }

    @Post('/logout')
    @ResponseMessage("Logout User")
    handleLogout(
        @Res({ passthrough: true }) response: Response,
        @User() user: IUser
    ) {
        return this.authService.logout(response, user);
    }

    // @Public()
    // @Get('/refresh')
    // @ResponseMessage("Get user by refresh token")
    // handleRefreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) { // req.user
    //     const refreshToken = request.cookies["refresh_token"];
    //     return this.authService.processNewToken(refreshToken, response);
    // }

    @Public()
    @Get('/refresh')
    @ResponseMessage("Get user by refresh token")
    handleRefreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) { // req.user
        const refreshToken = request.headers.authorization;
        return this.authService.processNewToken(refreshToken, response);
    }

    @Get('/account')
    @ResponseMessage("Get user information success")
    async handleGetAccount(@User() user: IUser) { // req.user
        const temp = await this.roleService.findOne(user.role._id) as any; // disable check type
        user.permissions = temp.permissions;
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
    @UseGuards(ThrottlerGuard)
    @Throttle(60, 60)
    @ApiBody({ type: UserLoginDto })
    @Post('/login')
    @ResponseMessage('Login successfully')
    handleLogin(
        @Req() req,
        @Res({ passthrough: true }) response: Response) {
        return this.authService.login(req.user, response);
    }

    recruiterRegister(@Body() registerUserDto: RegisterUserDto, createCompanyDto: CreateCompanyDto) {

    }
}
