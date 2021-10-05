/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
    secret: "MqC3wKCBsgdcrNcf9XRZ3qDJhZVE7sppLuoy39AksJqPLtJuGBVTTXwDdqyaARzQ",
    expiration: 900 // in seconds
};

export const SKIP_JWT_KEY = "skipJWT";
export const SkipJWTAuth = () => SetMetadata(SKIP_JWT_KEY, true);

export const AuthKeyConstants = {
    Realms: "gBjt8d2SqrCyLKMLaVEsZJ2E8DuU7Raz",
    Players: "7V2e6S2M6uAqujm8rhHZxXE4izegc87p"
};