import { emit } from "process"

export class ErrorConstants {

    /* COMPANY */
    public static readonly NOT_FOUND_COMPANY_ID = (id: string) => `Not found company with id ${id}`

    /* JOB */
    public static readonly NOT_FOUND_JOB_ID = (id: string) => `Not found job with id ${id}`

    /* RESUME */
    public static readonly RESUME_IS_EXIST = (userId: string, jobId: string) => `Resume is exist with user id ${userId} and job id ${jobId}`

    /* USER */
    public static readonly USER_IS_EXIST = (email: string) => `User is exist with email ${email}`

    public static readonly USER_IS_BLOCKED = (email: string) => `Account with email ${email} is blocked`

    /* USER TEMP REGISTER */
    public static readonly NOT_FOUND_USER_TEMP_REGISTER = (otp: string) => `Not found temporary user register with otp ${otp}`

    /* AUTH */
    public static readonly USERNAME_PASSWORD_INVALID = "email or password invalid"
}