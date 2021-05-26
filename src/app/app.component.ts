import { Component } from '@angular/core';
import { DrillDownService } from './drill-down.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private drillDownService: DrillDownService) {
  }
}
