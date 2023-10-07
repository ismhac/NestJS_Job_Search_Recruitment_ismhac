import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RolesService } from 'src/roles/roles.service';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private roleService: RolesService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
        });
    }

    async validate(payload: IUser) {
        const { _id, name, email, role } = payload;
        // gán thêm permission vào req.user
        const userRole = role as unknown as { _id: string, name: string };
        const temp = (await this.roleService.findOne(userRole._id)).toObject();

        // req.user
        return {
            _id,
            name,
            email,
            role,
            permissions: temp?.permissions ?? [],
        };
    }
}