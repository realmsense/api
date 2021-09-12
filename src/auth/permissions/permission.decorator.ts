/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { Permission } from "./permission.enum";

export const PERMISSION_KEY = "permission";
export const RequirePermission = (permission: Permission) => SetMetadata(PERMISSION_KEY, permission);
