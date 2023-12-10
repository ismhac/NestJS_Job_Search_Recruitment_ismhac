import { ResumeInfo } from "./dto/update-user.dto";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: {
        _id: string;
        name: string;
    };
    company?: {
        _id: string;
        name: string;
    };
    avatar: string;
    listCv: ResumeInfo[];
    permissions?: {
        _id: string;
        name: string,
        apiPath: string,
        module: string
    }[];
}
