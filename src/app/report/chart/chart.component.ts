import { OnInit, Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { DrillDownService } from '../../drill-down.service';
import { ChartComponent } from 'smart-webcomponents-angular/chart';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'data-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class DataChartComponent implements OnInit {
  @ViewChild('chart', { read: ChartComponent, static: false })
  chart: ChartComponent;
  @Input() columnData;
  @Input() title;
  @Input() desc;
  chartData = [];
  chartdynamicWidth:any;
  chartDynamicHeight:any
  currentUrl = "";
  constructor(private drillDownService: DrillDownService, private router:Router) {
    this.router.events.subscribe((event) => {
      console.log(event);
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
        console.log(this.currentUrl);
      }
    });

    if(this.currentUrl != '/dashboard'){
      this.chartdynamicWidth = '1350px';
      this.chartDynamicHeight = '550px';
    }else if(this.currentUrl == '/dashboard'){
      this.chartdynamicWidth = '350px';
      this.chartDynamicHeight = '300px';
    }

  }
  ngOnInit() {
    //window.addEventListener('scroll', this.scroll, true);
    this.getChartData();
  }

  type = '';
  orientation = '';
  flipChart = false;
  showLegend = true;
  caption= "";
  description = "";
  padding = { left: 10, top: 5, right: 25, bottom: 0 };
  titlePadding = { left: 90, top: 0, right: 0, bottom: 10 };
  dataSource = this.chartData;
  colorScheme = 'scheme29';
  //columnSeriesOverlap: false;
  xAxis = {
    dataField: '',
    unitInterval: 1,
    textRotationAngle: 0,
    valuesOnTicks: true,
    tickMarks: {
      visible: true,
      unitInterval: 1,
      color: '#888888',
    },
    gridLines: {
      visible: false,
      unitInterval: 1,
      color: '#888888',
    },
  };
  valueAxis = {
    unitInterval: 1,
    minValue: 0,
    maxValue: 0,
    visible: true,
    axisSize: 'auto',
    flip : false,
    textRotationAngle: 0,
    tickMarks: { color: '#888888' },
    gridLines: { color: '#888888' },
    formatSettings: { decimalPlaces: 0 },
    //labels: { horizontalAlignment: 'right' },
  };
  seriesGroups = [];

  getChartData() {
    this.title.dataset.value ? this.caption = this.title.dataset.value : this.caption = "";
    this.desc ? this.desc =  this.desc.dataset.value : this.desc = "";
    
    let dataGroup = [];
    if (this.columnData.rowGroup) {
      dataGroup.push(...this.columnData.rowGroup);
    }
    if (this.columnData.pivot) {
      dataGroup.push(...this.columnData.pivot);
    }
    let timeUnit = ['Year', 'Quarter', 'Month',"Customer"];
    let lastChildTimeUnit = null;
    let columnGroup = [];
    for (let i = 0; i < dataGroup.length; i++) {
      if (timeUnit.indexOf(dataGroup[i]) != -1) {
        lastChildTimeUnit = dataGroup[i];
        if (this.columnData.rowGroup || i < this.columnData.rowGroup.length - 1) {
          columnGroup = this.columnData.pivot;
        } else {
          columnGroup = this.columnData.rowGroup;
        }
        break;
      }
    }
    let data = {};
    this.drillDownService.arrangementsData.forEach((item) => {
      if (!data[item[lastChildTimeUnit]]) {
        data[item[lastChildTimeUnit]] = {};
      }
      let timeUnitData = data[item[lastChildTimeUnit]];
      for (let summary of this.columnData.summary) {
        if (!timeUnitData[summary.name]) timeUnitData[summary.name] = {};
        let summaryData = timeUnitData[summary.name];
        if (!columnGroup || !columnGroup.length) columnGroup = ['All'];
        for (let column of columnGroup) {
          let columnField = item[column];
          if (!summaryData[columnField]) {
            summaryData[columnField] = 0;
          }
          summaryData[columnField] += item[summary.name];
        }
      }
    });
    let max, min;
    let dataSource = [];

    let columns = [];

    for (let timeField in data) {
      let obj = {};
      obj[lastChildTimeUnit] = timeField;
      for (let summary in data[timeField]) {
        for (let column in data[timeField][summary]) {
          let value = data[timeField][summary][column];
          obj[summary + column] = value;
          if (!max && value > max) {
            max = value;
          }
          if (!min || value < min) {
            min = value;
          }
          if (!columns[summary]) columns[summary] = {};
          columns[summary][column] = '';
        }
      }
      dataSource.push(obj);
      console.log("====================");
      console.log(dataSource);
    }
    if(lastChildTimeUnit == "Customer"){
      if(dataSource){
        let dataSize = dataSource.length;
        console.log(dataSize);
        if(dataSize > 12){
          var chartHeight = dataSize * 30;
          console.log(chartHeight);
          if(chartHeight > 550){
            this.chartDynamicHeight = chartHeight+'px';
          }
        }
      }
    }
    for (let key in columns) {
      if(lastChildTimeUnit == "Customer"){
        //this.type = "column";
        this.orientation = "horizontal";
      }else {
        //this.type = "stackedcolumn";
      }
      let labels:boolean= false;
      if(!this.columnData.pivot){
        labels = false;
      }
      let chartColumns = {
        type: "stackedcolumn",
        orientation: this.orientation,
        columnsMinWidth:15,
        columnsMaxWidth: 15,
        columnsGapPercent: 50,
        seriesGapPercent: 1000,
        //skipOverlappingPoints: true,
        series: [],
        showLabels: labels,
        // toolTipFormatFunction: function (value: any, itemIndex: number, series: any) {
        //   console.log(dataSource[itemIndex]);
        //   var test = series.displayField;
        //   return dataSource[itemIndex].test;
        // },
      };
      for (let column in columns[key]) {
        let labels;
        let formartFunction;
        if(!this.columnData.pivot){
        if(lastChildTimeUnit == "Customer"){
            labels = {
              visible: true,
              horizontalAlignment: 'right',
              offset: { x: 50, y: 0 },
              //formatSettings: { decimalPlaces: 0 },
              //fill:'#E25848'
            }
          } else{
          labels = {
            visible: true,
            verticalAlignment: 'top',
            offset: { x: 0, y: -20 },
            //formatSettings: { decimalPlaces: 0 }
          }
        }
        formartFunction = function (value: any) {


          var exp, rounded,
          suffixes = ['K', 'M', 'G', 'T', 'P', 'E'];

          if (Number.isNaN(value)) {
            return null;
          }

          if(value == 0) return 0;
          if (value < 1000) {
            return Math.floor(value).toFixed(2);
          }

          exp = Math.floor(Math.log(value) / Math.log(1000));

          return (value / Math.pow(1000, exp)).toFixed(2) + suffixes[exp - 1];






          // if (value < 1000) {
          //     return isNaN(value) ? 0 : Math.round(value);
          // }
          // return isNaN(Math.round(value / 1000)) ? 0 : Math.round(value / 1000) + 'K';
        }
      }
        chartColumns.series.push({
          dataField: key + column,
          displayText:  (column !='undefined' ? column : '') + ' ' + key,
          labels: labels,
          formatFunction: formartFunction,
        //   colorFunction: function (value: number, itemIndex: any, serie: any, group: any) {
        //     return (value < 0) ? '#E25848' : '#61D14F';
        // }
        });
      }
      this.seriesGroups.push(chartColumns);
    }
    this.xAxis.dataField = lastChildTimeUnit;
    this.dataSource = dataSource;
    this.valueAxis.minValue = min;
    this.valueAxis.maxValue = max;  
    this.valueAxis.axisSize = "auto";
    if(lastChildTimeUnit == "Customer"){
      this.valueAxis.flip = true;
      this.xAxis.textRotationAngle = 90;
      this.valueAxis.textRotationAngle = -75;
    }else{
      this.valueAxis.flip = false;
    }
    this.valueAxis.unitInterval = (max - min) / 100;
  }

}
