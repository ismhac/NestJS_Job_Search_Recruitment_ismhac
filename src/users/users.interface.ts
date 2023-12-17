import mongoose from "mongoose";
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
        _id: mongoose.Schema.Types.ObjectId;
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
