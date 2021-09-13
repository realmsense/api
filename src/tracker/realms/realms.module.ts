import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RealmsController } from "./realms.controller";
import { RealmsService } from "./realms.service";

@Module({
    imports: [ ],
    exports: [RealmsService],
    controllers: [RealmsController],
    providers: [
        RealmsService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ],
})
export class RealmsModule { }