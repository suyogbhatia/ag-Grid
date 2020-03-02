import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample-grid',
  templateUrl: './sample-grid.component.html',
  styleUrls: ['./sample-grid.component.css']
})
export class SampleGridComponent implements OnInit {

  constructor() { }

  columnDefs = [
    {headerName: 'Make', field: 'make' },
    {headerName: 'Model', field: 'model' },
    {headerName: 'Price', field: 'price'}
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  backendData = [
    { color: "174, 175, 175", range: "{0, 0}" },
    { color: "255, 102, 0", range: "{1, 1}" },
    { color: "0, 153, 255", range: "{2, 2}"}
  ];

  ngOnInit() {
    this.getColDefs();
  }

  getColDefs(){
    this.backendData.forEach(obj=>{
      let colIndex = obj.range.substr(1,1)
      this.columnDefs[colIndex]['cellStyle'] = function (params) {
        const rowIndex = parseInt(obj.range.substr(4,1));
        if(params.node.rowIndex === rowIndex){
          return {
            'color': 'rgb('+obj.color+')'
          }
        }
      }
    })
  }
}
