import { ClientArea } from "./client-area";
import { Space } from "./space";

export class Area {
    id:number;
    longitude:number;
    latitude:number;
    name:string;
list_spaces:Space[];
list_clients_area:ClientArea[];
}
