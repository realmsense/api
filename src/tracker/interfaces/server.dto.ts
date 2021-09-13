import { IsNotEmpty } from "class-validator";
import { IServer } from "@realmsense/types";

export class ServerDTO implements IServer {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public address: string;
}