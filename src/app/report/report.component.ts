import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DrillDownService } from '../drill-down.service';
import { InputComponent } from 'smart-webcomponents-angular/input';
import { DateTimePickerComponent } from 'smart-webcomponents-angular/datetimepicker';
import { DataTableComponent } from './data-table/data-table.component';
import { DataChartComponent } from './chart/chart.component';
import { PieDataChartComponent } from './pieChart/piechart.component';
@Component({
  selector: 'drill-down-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent {
  public dateRange = {
    startDate: null,
    endDate: null,
  };
  columnData;
  reportId;
  showTable = false;
  showChart = false;
  showLoading = false;
  saveReportLoading = false;

  pieChart:boolean = false;
  verticalBarChart:boolean = false;;
  horizontalbarChart:boolean = false;

  @ViewChild('datetimepickerto', {
    read: DateTimePickerComponent,
    static: false,
  })
  datetimepickerto: DateTimePickerComponent;
  @ViewChild('dataTable', {
    read: DataTableComponent,
    static: false,
  })
  datatable: DataTableComponent;
  @ViewChild('dataChart',{
    read:DataChartComponent,
    static:false,
  })
  dataChart: DataChartComponent;
  @ViewChild('pieDataChart',{
    read:PieDataChartComponent,
    static:false,
  })
  pieDataChart: PieDataChartComponent;
  @ViewChild('datetimepickerfrom', {
    read: DateTimePickerComponent,
    static: false,
  })
  datetimepickerfrom: DateTimePickerComponent;

  @ViewChild('reportName', { read: InputComponent, static: false })
  reportName: InputComponent;
  currentUrl = "";
  date:any;
  constructor(
    public drillDownService: DrillDownService,
    private route: ActivatedRoute, private chartComponent: DataChartComponent,
    private pieChartComponent: PieDataChartComponent, private router:Router) {
    this.drillDownService.arrangementsData = [];
    
    this.date = Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.route.params.subscribe((params) => {
      if (params.id) {
        //@ts-ignore
        this.showLoading = true;
        this.reportId = params.id;
        this.drillDownService.getReport(params.id).then((data) => {
          this.columnData = data.columnData;
          this.datetimepickerfrom.value = new Date(data.dateRange.endDate);
          this.datetimepickerto.value = new Date(data.dateRange.startDate);
          this.reportName.value = data.reportName;
          this.showLoading = false;
        });
      }
    });
  }
  getReport() {
    if (this.datetimepickerfrom.ngValue && this.datetimepickerto.ngValue) {
      let dateRange = {
        startDate: this.datetimepickerto.ngValue,
        endDate: this.datetimepickerfrom.ngValue,
      };
      this.showTable = false;
      this.showLoading = true;
      this.drillDownService.getArrangementData(dateRange).then((data) => {
        
          this.showTable = true;
          this.showLoading = false;
        
        
      });
    }
  }
  getColumnAndShowChart() {
    this.verticalBarChart = true;
    this.pieChart = false;
    this.horizontalbarChart = false;
    this.showChart = true;
    this.showTable = false;
    this.getColumns();
  }
  getColumns() {
    let columnData = {};
    let groups = ['pivot', 'rowGroup', 'summary'];
    this.datatable.pivottable.columns.forEach((item) => {
      for (let key of groups) {
        if (item[key]) {
          if (!columnData[key]) {
            columnData[key] = [];
          }
          if (key == 'summary') {
            columnData[key].push({
              name: item.dataField,
              fun: item[key],
              settings: item.summarySettings,
            });
          } else {
            columnData[key].push(item.dataField);
          }
        }
      }
    });
    for (let key in columnData) {
      columnData[key] = columnData[key].reverse();
    }
    this.columnData = columnData;
  }
  saveReport() {
    if (!this.saveReportLoading) {
      this.saveReportLoading = true;
      this.getColumns();
      let data = {
        reportName: this.reportName.value ? this.reportName.value : 'Untitled',
        dateRange: {
          startDate: this.datetimepickerto.ngValue,
          endDate: this.datetimepickerfrom.ngValue,
        },
        columnData: this.columnData,
      };
      this.drillDownService.saveReport(data, this.reportId).then(() => {
        this.saveReportLoading = false;
      });
    }
  }
  downloadReport(type) {
    this.datatable.pivottable.exportData(
      type.toLowerCase(),
      this.reportName.value ? this.reportName.value : 'Untitled'
    );
  }

  downloadChart(type:string, isPieChart:boolean){
    if(!isPieChart){
      if(type == "PNG"){
        this.dataChart.chart.saveAsPNG(this.reportName.value ? this.reportName.value : 'Untitled');
      }
      if(type == "PDF"){
        this.dataChart.chart.saveAsPDF(this.reportName.value ? this.reportName.value : 'Untitled', 'landscape');
      }
    }else if(isPieChart){
      if(type == "PNG"){
        this.pieDataChart.chart.saveAsPNG(this.reportName.value ? this.reportName.value : 'Untitled');
      }
      if(type == "PDF"){
        this.pieDataChart.chart.saveAsPDF(this.reportName.value ? this.reportName.value : 'Untitled', 'landscape');
      }
    }

  }
  
  flipChart(){
    this.verticalBarChart = !this.verticalBarChart;
    this.pieChart = !this.pieChart;

  }
}
