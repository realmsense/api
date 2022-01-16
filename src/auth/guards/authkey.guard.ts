/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ENV } from "@realmsense/shared";

@Injectable()
export class AuthKeyGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    public canActivate(context: ExecutionContext): boolean {

        const keyRequired = this.reflector.getAllAndOverride<boolean>(AUTHKEY_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!keyRequired) return true;

        const request = context.switchToHttp().getRequest();
        const authkey = request.query["authkey"] as string;

        const validKeys = Object.values(ENV.Authkey);
        return validKeys.includes(authkey);
    }
}

export const AUTHKEY_KEY = "AUTHKEY";
export const RequireAuthKey = () => SetMetadata(AUTHKEY_KEY, true);