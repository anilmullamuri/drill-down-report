import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { Router } from '@angular/router';
@Injectable()
export class DrillDownService {
  arrangementsData = [];

  constructor(
    private appService: AppService,
    private router: Router,
    private httpClient: HttpClient
  ) {}
  getArrangementData(dateRange) {
    let startTimeStamp = dateRange.startDate.getTime();
    let endTimeStamp = dateRange.endDate.getTime();

    console.log(dateRange);
    console.log(dateRange.startDate.getDate() +"/"+ (dateRange.startDate.getMonth() + 1) +"/"+ dateRange.startDate.getFullYear());
    console.log(dateRange.endDate);
    console.log(startTimeStamp);
    console.log(endTimeStamp)

    return this.httpClient
      .get(
        `http://localhost:3000/arrangements?Year_gte=${dateRange.startDate.getFullYear()}&Year_lte=${dateRange.endDate.getFullYear()}`
      )
      .toPromise()
      .then((response: any) => {
        this.arrangementsData = response;
        return response;
      });
  }
  getReports() {
    return this.appService.getAll('reports').then((response: any) => {
      return response;
    });
  }
  getReport(id) {
    return this.appService.get('reports', id);
  }
  deleteReport(id) {
    return this.appService.delete('reports', id).then((response: any) => {
      return response;
    });
  }
  saveReport(data, id) {
    if (id) {
      return this.appService.update('reports', id, data).then((data) => {
        return data;
      });
    } else {
      return this.appService.create('reports', data).then((data) => {
        this.router.navigate(['/report', data.id]);
        return data;
      });
    }
  }
}
