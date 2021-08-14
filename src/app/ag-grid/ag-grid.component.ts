import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as gridData from "../../assets/grid-practice.json";

/*
  to import JSON file data -> resolveJsonModule in compilerOptions
  must be set to true in tsconfig.json
*/

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AgGridComponent implements OnInit {

  rowData = [];
  columnDefs = [];
  gridColumnApi;
  gridOptions;
  gridApi;
  defaultColDef = {
    sortable: true,
    filter: true
  };

  constructor() { }

  ngOnInit() {
    console.log(gridData['default']);
    this.setupGridOptions()
  }

  loadData() {
    this.rowData = gridData['default'];
  }

  setupGridOptions() {
    this.gridOptions = {
      context: {
        thisComponent: this
      },
      groupDefaultExpanded: 1,
      groupHeaderHeight: 40,
      headerHeight: 40,
      rowHeight: 30,
      onGridReady: (params) => {
        this.gridApi = params.api;
      },
      onCellClicked: (params) => {
        if (params.value === 'View and Edit') {
          params.node.setDataValue(params.colDef.field, 'View Only');
        } else if (params.value === 'View Only') {
          params.node.setDataValue(params.colDef.field, 'View and Edit');
        }
      }
    };
  }

  setUpGrid() {
    this.initialiseColDefs();
    this.resetColDefs();
    this.constructColDefs();
    this.gridApi.setColumnDefs(this.columnDefs);
    this.loadData();
  }

  constructColDefs() {
  }

  initialiseColDefs() {
    this.columnDefs = [
      {
        headerName: 'Measures',
        field: 'measures',
        cellClass: this.setCellClass.bind(this),
        width: 150,
      },
      {
        headerName: 'Permissions',
        field: 'permissions',
        cellClass: this.setCellClass.bind(this),
        width: 250,
      },
      {
        headerName: 'GSM',
        field: 'gsm',
        cellClass: this.setCellClass.bind(this),
        width: 150,
      },
      {
        headerName: 'Buy/Sell',
        field: 'buy/sell',
        cellClass: this.setCellClass.bind(this),
        width: 150,
      },
      {
        headerName: 'Buy/Sell Admin',
        field: 'buy/sellAdmin',
        cellClass: this.setCellClass.bind(this),
        width: 150,
      },
      {
        headerName: 'Buyer',
        field: 'buyer',
        cellClass: this.setCellClass.bind(this),
        width: 150,
      },
      {
        headerName: 'FG PO',
        field: 'fgpo',
        cellClass: this.setCellClass.bind(this),
        width: 150,
      },
      {
        headerName: 'FG PO Admin',
        field: 'fgpoAdmin',
        cellClass: this.setCellClass.bind(this),
        width: 150,
      },
      {
        headerName: 'Core Team',
        field: 'coreTeam',
        cellClass: this.setCellClass.bind(this),
        width: 150,
      },
      {
        headerName: 'IS&T',
        field: 'IS&T',
        cellClass: this.setCellClass.bind(this),
        width: 150,
      }
    ];
  }

  setCellClass(params) {
    let cellClasses = [];
    if (params.value === 'View and Edit') {
      cellClasses = ['brown'];
    } else if (params.value === 'View Only') {
      cellClasses = ['green'];
    }
    return cellClasses;
  }

  resetColDefs() {
    this.gridApi.setColumnDefs([]);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setUpGrid();
  }

}
