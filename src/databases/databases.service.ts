import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from 'src/permissions/schemas/permission.schema';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ROLE_ADMIN, ROLE_HR, ROLE_USER } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {

    private readonly logger = new Logger(DatabasesService.name);

    constructor(
        @InjectModel(User.name)
        private userModel: SoftDeleteModel<UserDocument>,

        @InjectModel(Permission.name)
        private permissionModel: SoftDeleteModel<PermissionDocument>,

        @InjectModel(Role.name)
        private roleModel: SoftDeleteModel<RoleDocument>,

        private configService: ConfigService,
        private userService: UsersService
    ) { }

    async onModuleInit() { }

    async initData() {
        const isInit = this.configService.get<string>('SHOULD_INIT');
        if (Boolean(isInit)) {
            const countUsers = await this.userModel.count({});
            const countPermissions = await this.permissionModel.count({});
            const countRoles = await this.roleModel.count({});

            const roles = [ROLE_ADMIN, ROLE_USER, ROLE_HR];
            const emails = ["root@gmail.com", "admin@gmail.com"];

            if (countRoles === 0) {
                // bulk create roles
                await this.roleModel.insertMany(roles.map(role => ({
                    name: role,
                    description: `${role} in system`,
                    isActive: true,
                })));
            }

            const allPermissions = await this.permissionModel.find({}).select("_id");

            for (const role of roles) {
                const roleDoc = await this.roleModel.findOne({ name: role });
                const permissions = role === ROLE_ADMIN ? allPermissions :
                    await this.permissionModel.find({
                        apiPath: { $not: { $regex: "/api/v1/(roles|permissions)", $options: "i" } }
                    }).select("_id");

                if (roleDoc) {
                    await roleDoc.updateOne({ $set: { permissions } });
                }
            }

            for (const email of emails) {
                const user = await this.userModel.findOne({ email });
                const adminRole = await this.roleModel.findOne({ name: ROLE_ADMIN });

                if (!user && adminRole) {
                    await this.userModel.create({
                        name: email.split('@')[0],
                        email,
                        password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD_ADMIN')),
                        age: 20,
                        gender: "MALE",
                        address: "VietNam",
                        role: adminRole._id,
                    });
                } else if (user && adminRole && user.role.toString() !== adminRole._id.toString()) {
                    await user.updateOne({ role: adminRole._id });
                }
            }

            if (countUsers > 0 && countPermissions > 0 && countRoles > 0) {
                this.logger.log(`users: ${countUsers}`);
                this.logger.log(`roles: ${countRoles}`);
                this.logger.log(`permissions: ${countPermissions}`);
                this.logger.log(`admin's permissions: ${(await this.roleModel.findOne({ name: ROLE_ADMIN })).permissions.length}`);
                this.logger.log(`user's permissions: ${(await this.roleModel.findOne({ name: ROLE_USER })).permissions.length}`);
                this.logger.log(`hr's permissions: ${(await this.roleModel.findOne({ name: ROLE_HR })).permissions.length}`);
            }
        }
    }
}
