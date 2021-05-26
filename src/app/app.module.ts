import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DrillDownService } from './drill-down.service';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportModule } from './report/report.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppService } from './app.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'report', pathMatch: 'full', loadChildren: './report/report.module#ReportModule' }, 
  { path: 'report/:id', pathMatch: 'full', loadChildren: './report/report.module#ReportModule' }, 
  { path: 'dashboard', pathMatch: 'full', loadChildren: './dashboard/dashboard.module#DashboardModule' }, 
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    CommonModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [DrillDownService,AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
