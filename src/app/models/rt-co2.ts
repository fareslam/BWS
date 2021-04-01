import { Device } from "./device";
import { HistoryCo2 } from "./history-co2";

export class RtCo2 {
    idRt:number;
    date:Date;
    valueCo2:number;
    list_history:HistoryCo2[];
    device:Device;
    reference:string;
}
