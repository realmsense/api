import { Module } from "@nestjs/common";
import { RealmsController } from "./realms.controller";
import { RealmsService } from "./realms.service";

@Module({
    imports: [],
    exports: [RealmsService],
    controllers: [RealmsController],
    providers: [
        RealmsService
    ],
})
export class RealmsModule { }
