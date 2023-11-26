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
    listCv: string[];
    permissions?: {
        _id: string;
        name: string,
        apiPath: string,
        module: string
    }[];
}
