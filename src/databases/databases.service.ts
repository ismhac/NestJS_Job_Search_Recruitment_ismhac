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

    async onModuleInit() {
        // const isInit = this.configService.get<string>('SHOULD_INIT');
        // if (Boolean(isInit)) {

        //     const countUser = await this.userModel.count({});
        //     const countPermission = await this.permissionModel.count({});
        //     const countRole = await this.roleModel.count({});

        //     // create permission
        //     // if (countPermission === 0) {
        //     //     await this.permissionModel.insertMany(INIT_PERMISSIONS); // bulk create 
        //     // }

        //     // create role
        //     if (countRole === 0) {
        //         const adminPermissions = await this.permissionModel.find({}).select("_id");
        //         const userPermissions = await this.permissionModel.find({
        //             apiPath: {
        //                 $in: [
        //                     "/api/v1/users",
        //                 ]
        //             }
        //         }).select("_id");

        //         console.log(userPermissions);


        //         await this.roleModel.insertMany([ // bulk create 
        //             {
        //                 name: ROLE_ADMIN,
        //                 description: "Admin has full permissions",
        //                 isActive: true,
        //                 permissions: adminPermissions
        //             },
        //             {
        //                 name: ROLE_USER,
        //                 description: "User/Candidate in system",
        //                 isActive: true,
        //                 permissions: [] // not set permission, just create role
        //             },
        //             {
        //                 name: ROLE_HR,
        //                 description: "HR in system",
        //                 isActive: true,
        //                 permissions: []
        //             }
        //         ]);
        //     }

        //     // create user
        //     if (countUser === 0) {
        //         const adminRole = await this.roleModel.findOne({ name: ROLE_ADMIN });
        //         const userRole = await this.roleModel.findOne({ name: ROLE_USER });
        //         const hrRole = await this.roleModel.findOne({ name: ROLE_HR });
        //         await this.userModel.insertMany([   // bulk create
        //             {
        //                 name: "Admin Init",
        //                 email: "initadmin@gmail.com",
        //                 password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD_ADMIN')),
        //                 age: 20,
        //                 gender: "MALE",
        //                 address: "VietNam",
        //                 role: adminRole?._id,
        //             },
        //             {
        //                 name: "HR Init",
        //                 email: "inithr@gmail.com",
        //                 password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD_HR')),
        //                 age: 24,
        //                 gender: "FEMALE",
        //                 address: "VietNam",
        //                 role: hrRole?._id,
        //             },
        //             {
        //                 name: "User init",
        //                 email: "inituser@gmail.com",
        //                 password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD_USER')),
        //                 age: 20,
        //                 gender: "MALE",
        //                 address: "VietNam",
        //                 role: userRole?._id,
        //             },
        //         ])
        //     }

        //     // check isCreate sample data
        //     if (countUser > 0 && countPermission > 0 && countRole > 0) {
        //         this.logger.log("==> Already init sample data");
        //     }
        // }
    }


    async initData() {
        const isInit = this.configService.get<string>('SHOULD_INIT');
        if (Boolean(isInit)) {

            const countUser = await this.userModel.count({});
            const countPermission = await this.permissionModel.count({});
            const countRole = await this.roleModel.count({});

            // create permission
            // if (countPermission === 0) {
            //     await this.permissionModel.insertMany(INIT_PERMISSIONS); // bulk create 
            // }

            // create role
            if (countRole != 0) {
                const adminRole = await this.roleModel.findOne({ name: ROLE_ADMIN });
                const allPermissions = await this.permissionModel.find({}).select("_id");
                if (adminRole) {
                    const countAdminPermissions = await adminRole.permissions.length;
                    if (countAdminPermissions < countPermission) {
                        await adminRole.updateOne({
                            permissions: allPermissions
                        })
                    }
                }
                // console.table({ adminRole });

                const userRole = await this.roleModel.findOne({ name: ROLE_USER });
                const userPermissions = await this.permissionModel.find({
                    $or: [
                        { apiPath: { $regex: "/api/v1/users", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/jobs", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/companies", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/resumes", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/subscribers", $options: "i" } },
                        // Add more paths here...
                    ]
                }).select("_id");

                await userRole.updateOne({
                    permissions: userPermissions
                })


                const hrRole = await this.roleModel.findOne({ name: ROLE_HR });
                const hrPermissions = await this.permissionModel.find({
                    $or: [
                        { apiPath: { $regex: "/api/v1/users", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/jobs", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/companies", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/resumes", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/subscribers", $options: "i" } },
                        // Add more paths here...
                    ]
                }).select("_id");

                await hrRole.updateOne({
                    permissions: hrPermissions
                })

                // console.table({ userRole: userRole.permissions.length, hrRole: hrRole.permissions.length });
            }


            if (countRole === 0) {
                const adminPermissions = await this.permissionModel.find({}).select("_id");
                const userPermissions = await this.permissionModel.find({
                    $or: [
                        { apiPath: { $regex: "/api/v1/users", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/jobs", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/companies", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/resumes", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/subscribers", $options: "i" } },
                        // Add more paths here...
                    ]
                }).select("_id");

                const hrPermissions = await this.permissionModel.find({
                    $or: [
                        { apiPath: { $regex: "/api/v1/users", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/jobs", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/companies", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/resumes", $options: "i" } },
                        { apiPath: { $regex: "/api/v1/subscribers", $options: "i" } },
                        // Add more paths here...
                    ]
                }).select("_id");

                // console.log(userPermissions);


                await this.roleModel.insertMany([ // bulk create 
                    {
                        name: ROLE_ADMIN,
                        description: "Admin has full permissions",
                        isActive: true,
                        permissions: adminPermissions
                    },
                    {
                        name: ROLE_USER,
                        description: "User/Candidate in system",
                        isActive: true,
                        permissions: userPermissions
                    },
                    {
                        name: ROLE_HR,
                        description: "HR in system",
                        isActive: true,
                        permissions: hrPermissions
                    }
                ]);
            }

            // create user
            if (countUser === 0) {
                const adminRole = await this.roleModel.findOne({ name: ROLE_ADMIN });
                const userRole = await this.roleModel.findOne({ name: ROLE_USER });
                const hrRole = await this.roleModel.findOne({ name: ROLE_HR });
                await this.userModel.insertMany([   // bulk create
                    {
                        name: "Admin Init",
                        email: "initadmin@gmail.com",
                        password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD_ADMIN')),
                        age: 20,
                        gender: "MALE",
                        address: "VietNam",
                        role: adminRole?._id,
                    },
                    {
                        name: "HR Init",
                        email: "inithr@gmail.com",
                        password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD_HR')),
                        age: 24,
                        gender: "FEMALE",
                        address: "VietNam",
                        role: hrRole?._id,
                    },
                    {
                        name: "User init",
                        email: "inituser@gmail.com",
                        password: this.userService.getHashPassword(this.configService.get<string>('INIT_PASSWORD_USER')),
                        age: 20,
                        gender: "MALE",
                        address: "VietNam",
                        role: userRole?._id,
                    },
                ])
            }

            // check isCreate sample data
            if (countUser > 0 && countPermission > 0 && countRole > 0) {
                this.logger.log("==> Already init sample data");
            }
        }
    }
}
