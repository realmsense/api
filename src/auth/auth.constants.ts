/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { SetMetadata } from "@nestjs/common";

export const SKIP_JWT_KEY = "skipJWT";
export const SkipJWTAuth = () => SetMetadata(SKIP_JWT_KEY, true);