import { OnInit, Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { PivotTableComponent } from 'smart-webcomponents-angular/pivottable';
import { DrillDownService } from '../../drill-down.service';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit,AfterViewInit {
  @ViewChild('pivottable', { read: PivotTableComponent, static: false })
  pivottable: PivotTableComponent;
  @Input() columnData;
  conditionalFormatting = [];
  designer:boolean = false;
  getDefaultSummaryFunction = () => 'sum';

   /**onCellRender(dt){
    console.log(dt);
    //console.log(dt.group);
    if(dt.group){
      if(dt.group !== undefined){
        var group1 = dt.group;
        let group = group1.substr(0, dt.group.lastIndexOf("(") - 1);
        console.log("@@@@@@@@@@@@@@ " + group);
        dt.group = group;
        console.log(dt);
      }
    }
    
    
    //var groupName = dt.group;
    //groupName = groupName.substring()
    //dt.
    //console.log("cell rendered");
    return;
  }
  */
  onColumnRender(dt){
    console.log(dt)
    if(dt.column.dataField){
      if(dt.column.originalColumn.dataType){
        if(dt.column.originalColumn.dataType == "number"){
          console.log(dt.column);
          console.log(dt.column.originalColumn.label);
          dt.text = dt.column.originalColumn.label;
        }
      }
      
    }
    return;
  }
  onInit = function () {
    this.expandAllRows();
  };
  toggleDesigner(){
    this.designer = !this.designer;
  }
  
  grandTotals = true;
  rowTotals = true;
  freezeHeader = true;
  keyboardNavigation = true;
  toolbar = true;
  columnTotals = false;
  cellDrillDown = false;
  filters = {};
  columns = [
    {
      label: 'Year',
      dataField: 'Year',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: false,
    },
    {
      label: 'Quarter',
      dataField: 'Quarter',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: false,
    },
    {
      label: 'Month',
      dataField: 'Month',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: false,
    },
    {
      label: 'Quarter Name',
      dataField: 'Quarter Name',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: false,
    },
    {
      label: 'Period Name',
      dataField: 'Period Name',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: false,
    },
    {
      label: 'Product Portfolio',
      dataField: 'Product Portfolio',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Cust #',
      dataField: 'Cust #',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Customer',
      dataField: 'Customer',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'PO#',
      dataField: 'PO#',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'SO#',
      dataField: 'SO#',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Deal #',
      dataField: 'Deal #',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Deal line #',
      dataField: 'Deal line #',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'BK Qty',
      dataField: 'BK Qty',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Transaction Currency',
      dataField: 'Transaction Currency',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Arrangement Number',
      dataField: 'Arrangement Number',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Arrangement Name',
      dataField: 'Arrangement Name',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Arrangement Type',
      dataField: 'Arrangement Type',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Sales Theater',
      dataField: 'Sales Theater',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Sales Region',
      dataField: 'Sales Region',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Sales Territory',
      dataField: 'Sales Territory',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Sales Rep',
      dataField: 'Sales Rep',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Product Name',
      dataField: 'Product Name',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Product Portfolio',
      dataField: 'Product Portfolio',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Product Family',
      dataField: 'Product Family',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Product Line',
      dataField: 'Product Line',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Contingency Release Date',
      dataField: 'Contingency Release Date',
      dataType: 'string',
      allowRowGroup: true,
      allowPivot: true,
      allowFilter: true,
    },
    {
      label: 'Allocated Amount (TC)',
      dataField: 'Allocated Amount (TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Allocated Amount (FC)',
      dataField: 'Allocated Amount (FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Delivered Amount (TC)',
      dataField: 'Delivered Amount (TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Billed Amt(TC)',
      dataField: 'Billed Amt(TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Billed Amt(FC)',
      dataField: 'Billed Amt(FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Delivered not billed (DNB)',
      dataField: 'Delivered not billed (DNB)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Delivered Allocated Price (TC)',
      dataField: 'Delivered Allocated Price (TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Delivered Allocated Price (FC)',
      dataField: 'Delivered Allocated Price (FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Revenue Deferred(TC)',
      dataField: 'Revenue Deferred(TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Revenue Deferred(FC)',
      dataField: 'Revenue Deferred(FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Contract Asset (TC)',
      dataField: 'Contract Asset (TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Contract Liability (TC)',
      dataField: 'Contract Liability (TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Deferred Revenue (TC)',
      dataField: 'Deferred Revenue (TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Clearing (TC)',
      dataField: 'Clearing (TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Contract Asset (FC)',
      dataField: 'Contract Asset (FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Contract Liability (FC)',
      dataField: 'Contract Liability (FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Deferred Revenue (FC)',
      dataField: 'Deferred Revenue (FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Clearing (FC)',
      dataField: 'Clearing (FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Revenue Begin Balance (TC)',
      dataField: 'Revenue Begin Balance (TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Revenue Current Balance (TC)',
      dataField: 'Revenue Current Balance (TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Revenue End Balance (TC)',
      dataField: 'Revenue End Balance (TC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Revenue Begin Balance (FC)',
      dataField: 'Revenue Begin Balance (FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Revenue Current Balance (FC)',
      dataField: 'Revenue Current Balance (FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Revenue End Balance (FC)',
      dataField: 'Revenue End Balance (FC)',
      dataType: 'number',
      allowFilter: false,
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
    },
    {
      label: 'Revenue Current Balance (FC)',
      dataField: 'Revenue Current Balance (FC)',
      dataType: 'number',
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
      allowFilter: false,
    },
    {
      label: 'Revenue End Balance (FC)',
      dataField: 'Revenue End Balance (FC)',
      dataType: 'number',
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
      allowFilter: false,
    },
    {
      label: 'QTD Revenue Begin Balance (TC)',
      dataField: 'QTD Revenue Begin Balance (TC)',
      dataType: 'number',
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
      allowFilter: false,
    },
    {
      label: 'QTD Revenue Current Balance (TC)',
      dataField: 'QTD Revenue Current Balance (TC)',
      dataType: 'number',
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
      allowFilter: false,
    },
    {
      label: 'YTD Revenue Begin Balance (TC)',
      dataField: 'YTD Revenue Begin Balance (TC)',
      dataType: 'number',
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
      allowFilter: false,
    },
    {
      label: 'YTD Revenue Current Balance (TC)',
      dataField: 'YTD Revenue Current Balance (TC)',
      dataType: 'number',
      summarySettings: { prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','},
      allowFilter: false,
    },
  ];
  dataSource = null;
  constructor(public drilldownService: DrillDownService) {
    this.dataSource = this.createPivotDataSource(
      this.drilldownService.arrangementsData
    );
  }
  createPivotDataSource(data): any {
   
    return new window.Smart.DataAdapter({
      dataSource: data,
      
      //sorting:{enabled:true}
    });
    
  }

  ngOnInit() {
    this.columnData == undefined ? this.designer = true : this.designer = false; 
    if(this.columnData) {
      let changePosition = (val , index, key) => {
        let data = this.columns[index];
        this.columns.splice(index,1);
        this.columns.unshift(data);
        this.columns[0][key] = val;
      }
      for (let key in this.columnData) {
        if (key == 'summary') {
          this.columnData[key].forEach(element => {
            let index = this.columns.findIndex((item)=> item.dataField == element.name);
            if (index != -1) {
              changePosition(element.fun,index,key);
              this.columns[0]['summarySettings'] =  this.columnData['settings'];
            }
          });          
        } else {
          this.columnData[key].forEach(element => {
            let index = this.columns.findIndex((item)=> item.dataField == element);
            if (index != -1) {
              changePosition(true,index,key);
            }
          })
        }
      }
      
    } else {
      let index = this.columns.findIndex((item) => item.label == 'Revenue Begin Balance (FC)')
      this.columns[index]['summary']= 'sum';
      this.columns[index]['summarySettings']= {
        prefix: '$', decimalPlaces: 2 , align:'right', thousandsSeparator:','
      }
    }
    
  }
  ngAfterViewInit(){
    
  }
  
}
