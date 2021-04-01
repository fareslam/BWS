import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { donutChartOptions } from './helpers/dountChartOptions';
import { areaChartOptions } from './helpers/areaChartOptions';
import { barChart } from './helpers/barChart';
import {oneLineBar} from './helpers/oneLineBar';
@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit {
  chart = new Chart(donutChartOptions);
  areaSplineChart = new Chart(areaChartOptions);
  barChart = new Chart(barChart);
  oneLineBar = new Chart(oneLineBar);
  constructor() { }

  ngOnInit(): void {
  }

}
