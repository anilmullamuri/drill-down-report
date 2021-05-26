import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDateRangeModule } from 'ngx-daterange';
import { DataTableComponent } from './data-table/data-table.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { RouterModule, Routes } from '@angular/router';
import { PivotTableModule } from 'smart-webcomponents-angular/pivottable';
import { DateTimePickerModule } from 'smart-webcomponents-angular/datetimepicker';
import { InputModule } from 'smart-webcomponents-angular/input';
import { DataChartComponent } from './chart/chart.component';
import { ChartModule } from 'smart-webcomponents-angular/chart';
import { PieDataChartComponent } from './pieChart/piechart.component';
const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
  },
];

@NgModule({
  declarations: [DataTableComponent,DataChartComponent, ReportComponent, PieDataChartComponent],
  imports: [
    ChartModule,
    CommonModule,
    PivotTableModule,
    DateTimePickerModule,
    InputModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  bootstrap: [ReportComponent],
  providers:[DataChartComponent, PieDataChartComponent]
})
export class ReportModule {}
