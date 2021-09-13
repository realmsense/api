import { IsNotEmpty } from "class-validator";

export interface Server {
    name: string,
    address: string
}

export class ServerDTO implements Server {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public address: string;
}