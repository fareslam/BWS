import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import notify from 'devextreme/ui/notify';
import { ConstraintCo2 } from '../../models/constraint-co2';

import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import {  DxDataGridComponent } from 'devextreme-angular';
import 'jspdf-autotable';
import { exportDataGrid } from 'devextreme/excel_exporter';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  dataSource: ConstraintCo2[] = [];
  constraint:any={};
  msg = '';
  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.readData();
  }


  readData() {
    this.adminService.listConstraints().subscribe(
      data => {

        this.dataSource = data;

        console.log(data);
      },

      err=> {
        console.log(err);

      }
    );
  }


  addConstraint(event){
let form:any={
  "nameConstraint":event.data.nameConstraint,
  "min_value":event.data.min_value,
  "max_value":event.data.max_value,

}

    this.adminService.addConstraint(form).subscribe(
      data=>{console.log(data);
        notify("Constraint added successfully", "success", 1500);
        this.readData();},
        err=>{
        notify(err.error.message, "warning", 1500);
        this.readData();
        console.log(err.error.message)
      }
    )
    console.log(event)
  }


  removeConstraint(event){

    this.adminService.deleteConstraint(event.data.idConstraint).subscribe(
      data=>{this.msg=data;
        console.log(event.data)
        this.readData();
        notify("Constraint deleted successfully", "success", 1500);
      }

     ,
      err=>{
        notify(err.error.message, "warning", 1500);

      }
    )
  }



 updateConstraint(event){

    this.adminService.updateConstraint(event.data.idConstraint,event.data).subscribe(
      data=>{console.log(data);
        notify("Constraint Updated successfully", "success", 1500);
        this.readData();},
        err=>{
        notify(err.error.message, "warning", 1500);
        this.readData();
        console.log(err.error.message)
      }
    )
    console.log(event)
  }



exportGrid1() {
  const doc = new jsPDF();
  exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance
  }).then(() => {
      doc.save('constraintsCO2.pdf');
  })
}

onExporting1(e) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('constraintsCO2');

  worksheet.columns = [
    { width: 5 }, { width: 30 }, { width: 25 }, { width: 15 }, { width: 25 }, { width: 40 }
  ];

  exportDataGrid({
    component: e.component,
    worksheet: worksheet,
    keepColumnWidths: false,
    topLeftCell: { row: 2, column: 2 },
    customizeCell: ({ gridCell, excelCell }) => {
      if(gridCell.rowType === "data") {


      }

    }
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: "application/octet-stream" }), "constraintsCO2.xlsx");
    });
  });
  e.cancel = true;
}

}
