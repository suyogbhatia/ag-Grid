import { Component, OnInit } from '@angular/core';
import * as gridData from "../../assets/grid-practice.json";

import * as XLSX from 'xlsx';



/*
  to import JSON file data -> resolveJsonModule in compilerOptions
  must be set to true in tsconfig.json
*/

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css'],
  // encapsulation: ViewEncapsulation.None
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

  downloadToExcel(){
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);
    XLSX.utils.book_append_sheet(wb, ws);
    XLSX.writeFile(wb, 'Employ Details' + new Date() + '.xlsx');
  }

  expandGrid(elem) {
    const docElmWithBrowsersFullScreenFunctions = document.getElementById(elem) as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
    if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    }
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
        if (params.value === 'Blue') {
          params.node.setDataValue(params.colDef.field, 'Green');
        } else if (params.value === 'Green') {
          params.node.setDataValue(params.colDef.field, 'Blue');
        }
        // params.api.refreshCells({ force: true })
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
        headerName: 'Name',
        field: 'name',
        width: 195,
      },
      {
        headerName: 'Date of Birth',
        field: 'dob',
        width: 195,
        // Value formatter is for formatting a rowdata value through a function
        valueFormatter : (params) =>{
          return new Date(params.value).toLocaleDateString()
        }
      },
      {
        headerName: 'Country',
        field: 'country',
        width: 195,
      },
      {
        headerName: 'Continent',
        field: 'continent',
        width: 195,
      },
      {
        headerName: 'Language',
        field: 'language',
        width: 195,
      },
      {
        headerName: 'Mobile',
        field: 'mobile',
        width: 195,
      },
      {
        headerName: 'Landline',
        field: 'landline',
        width: 195,
      },
      {
        headerName: 'Address',
        field: 'address',
        width: 575
      }
    ];

    this.columnDefs.forEach(x=>{
      x['resizable'] = true
    })
  }

  // setCellClass(params) {
  //   if (params.value === 'Blue') {
  //     return 'blue';
  //   } else if (params.value === 'Green') {
  //     return 'green';
  //   }
  // }

  resetColDefs() {
    this.gridApi.setColumnDefs([]);
  }
  searchGrid(keyword) {
    this.gridApi.setQuickFilter(keyword);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setUpGrid();
  }

}
