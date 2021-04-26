import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  form:any={};
  date:Date;
  file:any=["PDF","EXCEL"];
  buttonOptions: any = {
    text: "Export",
    type: "success",
    useSubmitBehavior: true
}
  /*alert:any;
  ct:any;
  rt:any;*/

  constructor() { }

  ngOnInit(): void {
  }

}
