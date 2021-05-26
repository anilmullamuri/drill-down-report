import { Component } from '@angular/core';
import { DrillDownService } from '../drill-down.service';

@Component({
  selector: 'dashborad-reports',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  reportList = [];
  showLoading = false;
  constructor(private drillDownService: DrillDownService) {
  }
  ngOnInit() {
    this.showLoading = true;
    this.drillDownService.getReports().then((data)=>{
      this.reportList = data;
      this.showLoading = false;
    })
  }
  deleteReport(index){
    let id = this.reportList[index].id;
    this.reportList.splice(index,1);
    this.drillDownService.deleteReport(id);
  }
}
