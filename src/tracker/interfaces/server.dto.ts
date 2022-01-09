import { IServer } from "@realmsense/shared";
import { IsNotEmpty } from "class-validator";

export class ServerDTO implements IServer {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public address: string;
}