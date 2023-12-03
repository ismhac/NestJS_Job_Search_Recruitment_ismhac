import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiExcludeController, ApiExcludeEndpoint, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { Request, Response } from "express";
import { Public, ResponseMessage, User } from "src/decorator/customize";
import { RolesService } from "src/roles/roles.service";
import { RegisterRecruiterDto, RegisterUserDto, UserLoginDto } from "src/users/dto/create-user.dto";
import { IUser } from "src/users/users.interface";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { UsersService } from "src/users/users.service";
import { CompaniesService } from "src/companies/companies.service";
import { logger } from "handlebars";


@ApiTags("authentications")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private roleService: RolesService,
        private usersService: UsersService,
        private companyService: CompaniesService
        // private
    ) { }

    @Post('/logout')
    @ResponseMessage("Logout User")
    // swagger
    @ApiBearerAuth('token')
    @ApiOperation({ summary: 'API logout' })
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
    // swagger
    // @ApiBearerAuth('token')
    @ApiExcludeEndpoint() // hide this endpoint in swagger
    @ApiOperation({ summary: 'API get user by refresh token' })
    handleRefreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response) { // req.user
        const refreshToken = request.headers.authorization;
        return this.authService.processNewToken(refreshToken, response);
    }

    @Get('/account')
    @ResponseMessage("Get user information success")
    // swagger
    @ApiBearerAuth('token')
    @ApiOperation({ summary: 'API get user information' })
    async handleGetAccount(@User() user: IUser) { // req.user
        const temp = await this.roleService.findOne(user.role._id) as any; // disable check type
        user.permissions = temp.permissions;

        const getUser = await this.usersService.findUsersById(user._id);
        let getCompany = getUser.company as any;
        let companyName = "";
        if (getCompany) {
            companyName = (await this.companyService.findOne(getCompany?._id))?.name;
            getCompany.name = companyName;
        }

        user.avatar = getUser.avatar;
        user.listCv = getUser.listCv;
        user.company = getCompany;
        return { user }
    }

    @Public()
    @Post('/user-register')
    @ResponseMessage('Register a new user success')
    // swagger
    @ApiOperation({ summary: 'API register user' })
    @ApiBody({ type: RegisterUserDto })
    handleRegister(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.userRegister(registerUserDto);
    }


    @Public()
    @UseGuards(LocalAuthGuard)
    @UseGuards(ThrottlerGuard)
    @Throttle(60, 60)
    @Post('/login')
    @ResponseMessage('Login successfully')
    // swagger
    @ApiOperation({ summary: 'API login' })
    @ApiBody({ type: UserLoginDto })
    handleLogin(
        @Req() req,
        @Res({ passthrough: true }) response: Response) {
        return this.authService.login(req.user, response);
    }

    @Public()
    @Post('/recruiter-register')
    @ResponseMessage('Register a new recruiter success')
    // swagger
    @ApiOperation({ summary: 'API register recruiter' })
    @ApiBody({ type: RegisterRecruiterDto })
    recruiterRegister(
        @Body() registerRecruiterDto: RegisterRecruiterDto
    ) {
        return this.authService.recruiterRegister(registerRecruiterDto);
    }
}
