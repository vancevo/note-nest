import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (
    key: string, //id, description...
    ctx: ExecutionContext,
  ) => {
    //ctx = context, //data la key, nen chinh thanh string
    const request: Express.Request = ctx.switchToHttp().getRequest();
    // return request['user']
    const user = request['user']; 
    return key ? user?.[key] : user;
  },
);
