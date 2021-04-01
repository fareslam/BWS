import { Area } from "./area";
import { Device } from "./device";
import { SubUserSpace } from "./sub-user-space";

export class Space {
    idspace:number;
    longitude:number;
    latitude:number;
    list_devices_space:Device[];
    area:Area;
    idArea:number;
    list_sub_space:SubUserSpace[];
}

