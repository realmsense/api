/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Permission } from "@realmsense/shared";
import { User } from "../../users/interfaces/user.entity";


@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    public canActivate(context: ExecutionContext): boolean {

        const requiredPermission: Permission = this.reflector.getAllAndOverride<Permission>(PERMISSION_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredPermission) return true;

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        return user.permissions.includes(requiredPermission);
    }
}

export const PERMISSION_KEY = "permission";
export const RequirePermission = (permission: Permission) => SetMetadata(PERMISSION_KEY, permission);