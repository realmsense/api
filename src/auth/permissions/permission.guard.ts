
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "src/users/interfaces/user.entity";
import { PERMISSION_KEY } from "./permission.decorator";
import { Permission } from "./permission.enum";

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
