import { OnInit, Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { DrillDownService } from '../../drill-down.service';
import { ChartComponent } from 'smart-webcomponents-angular/chart';
@Component({
  selector: 'pie-data-chart',
  templateUrl: './pieChart.component.html',
  styleUrls: ['./pieChart.component.css'],
})
export class PieDataChartComponent implements OnInit {
  @ViewChild('chart', { read: ChartComponent, static: false })
  chart: ChartComponent;
  @Input() columnData;
  @Input() title : string;
  @Input() desc : string;
  chartData = [];
  
  constructor(private drillDownService: DrillDownService) {}
  ngOnInit() {
    this.getChartData();
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
  type = '';
  orientation = '';
  flipChart = false;
  showLegend = true;
  caption= "";
  description = "";
  //legendLayout = { left: 1000, top: 160, width: 300, height: 200, flow: 'vertical' };
  legendPosition = { left: 520, top: 140, width: 100, height: 100 };
  padding = { left: 5, top: 5, right: 5, bottom: 0 };
  titlePadding = { left: 90, top: 0, right: 0, bottom: 10 };
  dataSource = this.chartData;
  colorScheme = 'scheme29';
  //columnSeriesOverlap: true;
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
    formatSettings: { decimalPlaces: 0 }
  };
  seriesGroups = [];

  getChartData() {
    console.log(this.title);
    this.caption = this.title;
    this.description = this.desc;
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
          //columnGroup = this.columnData.pivot;
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
          let key = "'"+summary+"'";
          obj[key] = value;
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
      console.log(dataSource);
    }
    if(lastChildTimeUnit == "Customer"){
      if(dataSource.length > 10){
        dataSource.splice(10, (dataSource.length -1) - 10 );
      }
    }
    let dataField;
    let count:number = 0;
    for (let key in columns) {
      // if(lastChildTimeUnit == "Customer"){
      //   this.type = "column";
      //   this.orientation = "horizontal";
      // }
      //else 
      //{
        this.type = "pie";
      //}
      let chartColumns = {
        type: this.type,
        orientation: this.orientation,
        //columnsMinWidth:20,
        //columnsMaxWidth: 20,
        //columnsGapPercent: 50,
        //seriesGapPercent: 0,
        //skipOverlappingPoints: true,
        series: [],
        showLabels: true,
        // toolTipFormatFunction: function (value: any, itemIndex: number, series: any) {
        //   return value;
        // },
      };
      
      console.log(columns);
      
      for (let column in columns[key]) {
        
        // let labels;
        // labels = {
        //   visible: true,
        //   verticalAlignment: 'top',
        //   offset: { x: 0, y: -20 },
        //   //formatSettings: { decimalPlaces: 0 }
        // }
        console.log(column);

        if(count == 0){
          dataField = key;
          chartColumns.series.push({
            dataField: "'"+dataField+"'",
            displayText:  lastChildTimeUnit,
            labelRadius: 110,
            initialAngle: 15,
            radius: 100,
            centerOffset: 0,
            //labels: labels,
            //formatFunction: this.formartFunction,
          });
        }
        count++;
        //break;
      }
      console.log(chartColumns);
      this.seriesGroups.push(chartColumns);
    }
    this.xAxis.dataField = lastChildTimeUnit;
    this.dataSource = dataSource;
    this.valueAxis.minValue = min;
    this.valueAxis.maxValue = max;  
    this.valueAxis.axisSize = "auto";
    // if(lastChildTimeUnit == "Customer"){
    //   this.valueAxis.flip = true;
    //   this.xAxis.textRotationAngle = 90;
    //   this.valueAxis.textRotationAngle = -75;
    // }else{
    //   this.valueAxis.flip = false;
    // }
    this.valueAxis.unitInterval = (max - min) / 100;
  }

}
