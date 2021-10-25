/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthKeyGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    public canActivate(context: ExecutionContext): boolean {

        const requiredKey = this.reflector.getAllAndOverride<string>(AUTHKEY_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredKey) return true;

        const request = context.switchToHttp().getRequest();
        const authkey = request.query["authkey"];
        return requiredKey == authkey;
    }
}

export const AUTHKEY_KEY = "AUTHKEY";
export const RequireAuthKey = (key: string) => SetMetadata(AUTHKEY_KEY, key);