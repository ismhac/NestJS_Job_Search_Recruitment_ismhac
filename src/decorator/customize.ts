import { SetMetadata, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';


export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);   // @Public() 

export const RESPONSE_MESSAGE = 'response_message';

export const ResponseMessage = (message: string) =>             // @ResponseMessage("message")
    SetMetadata(RESPONSE_MESSAGE, message);

export const User = createParamDecorator(                       // @User()
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);