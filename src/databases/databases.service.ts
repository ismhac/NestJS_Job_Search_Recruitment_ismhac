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

            if (countRoles !== 0) {

                const adminRole = await this.roleModel.findOne({ name: ROLE_ADMIN });
                // check admin role
                if (adminRole) {
                    const countAdminPermissions = await adminRole.permissions.length;
                    if (countAdminPermissions < countPermissions) {
                        const allPermissions = await this.permissionModel.find({}).select("_id");
                        await adminRole.updateOne({
                            permissions: allPermissions
                        })
                    }

                }

                // check user role
                const userRole = await this.roleModel.findOne({ name: ROLE_USER });
                if (userRole) {
                    const userPermissions = await this.permissionModel.find({
                        apiPath: { $not: { $regex: "/api/v1/(roles|permissions)", $options: "i" } }
                    }).select("_id");

                    await userRole.updateOne({
                        permissions: userPermissions
                    })
                }

                // check hr role
                const hrRole = await this.roleModel.findOne({ name: ROLE_HR });
                if (hrRole) {
                    const hrPermissions = await this.permissionModel.find({
                        apiPath: { $not: { $regex: "/api/v1/(roles|permissions)", $options: "i" } }
                    }).select("_id");

                    await hrRole.updateOne({
                        permissions: hrPermissions
                    })
                }

                console.table({
                    "admin's permissions": adminRole.permissions.length,
                    "user's permissions": userRole.permissions.length,
                    "hr's permissions": hrRole.permissions.length
                });
            }

            if (countRoles === 0) {
                await this.roleModel.insertMany([ // bulk create 
                    {
                        name: ROLE_ADMIN,
                        description: "Admin has full permissions",
                        isActive: true,
                    },
                    {
                        name: ROLE_USER,
                        description: "User/Candidate in system",
                        isActive: true,
                    },
                    {
                        name: ROLE_HR,
                        description: "HR in system",
                        isActive: true,
                    }
                ]);

                const adminRole = await this.roleModel.findOne({ name: ROLE_ADMIN });
                const allPermissions = await this.permissionModel.find({}).select("_id");

                const countAdminPermissions = await adminRole.permissions.length;
                if (countAdminPermissions < countPermissions) {
                    await adminRole.updateOne({
                        permissions: allPermissions
                    })
                }


                const userRole = await this.roleModel.findOne({ name: ROLE_USER });
                const userPermissions = await this.permissionModel.find({
                    apiPath: { $not: { $regex: "/api/v1/(roles|permissions)", $options: "i" } }
                }).select("_id");

                await userRole.updateOne({
                    permissions: userPermissions
                })

                const hrRole = await this.roleModel.findOne({ name: ROLE_HR });
                const hrPermissions = await this.permissionModel.find({
                    apiPath: { $not: { $regex: "/api/v1/(roles|permissions)", $options: "i" } }
                }).select("_id");

                await hrRole.updateOne({
                    permissions: hrPermissions
                })
                console.table({
                    "admin's permissions": adminRole.permissions.length,
                    "user's permissions": userRole.permissions.length,
                    "hr's permissions": hrRole.permissions.length
                });
            }

            // create user
            if (!(await this.userModel.findOne({ email: "root@gmail.com" }) && await this.userModel.findOne({ email: "admin@gmail.com" }))) {
                const adminRole = await this.roleModel.findOne({ name: ROLE_ADMIN });
                if (!(await this.userModel.findOne({ email: "root@gmail.com" }))) {
                    await this.userModel.create(
                        {
                            name: "root",
                            email: "root@gmail.com",
                            password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD_ADMIN')),
                            age: 20,
                            gender: "MALE",
                            address: "VietNam",
                            role: adminRole?._id,
                        }
                    )
                }
                if (!await this.userModel.findOne({ email: "admin@gmail.com" })) {
                    await this.userModel.create(
                        {
                            name: "admin",
                            email: "admin@gmail.com",
                            password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD_ADMIN')),
                            age: 20,
                            gender: "MALE",
                            address: "VietNam",
                            role: adminRole?._id,
                        }
                    )
                }
            }

            // check isCreate sample data
            if (countUsers > 0 && countPermissions > 0 && countRoles > 0) {
                console.table({ "users": countUsers, "roles": countRoles, "permissions": countPermissions });
            }
        }
    }
}
