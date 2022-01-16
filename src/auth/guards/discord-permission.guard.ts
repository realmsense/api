/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ENV, Permission } from "@realmsense/shared";
import { DiscordService } from "../../tracker/discord/discord.service";

@Injectable()
export class DiscordPermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private discordService: DiscordService
    ) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {

        const requiredPermission = this.reflector.getAllAndOverride<Permission>(DISCORD_PERMISSION_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredPermission) return true;

        const request = context.switchToHttp().getRequest();
        const authkey = request.query["authkey"];
        const discordId = request.query["discordId"];

        if (!authkey || !discordId) {
            return false;
        }

        if (request.query["authkey"] != ENV.Authkey.TrackerDiscord) {
            return false;
        }

        const user = await this.discordService.getUser(discordId);
        if (!user) {
            return false;
        }

        return user.permissions.includes(requiredPermission);
    }
}

export const DISCORD_PERMISSION_KEY = "DISCORD_PERMISSION_KEY";
export const RequireDiscordPermissionKey = (permission: Permission) => SetMetadata(DISCORD_PERMISSION_KEY, permission);