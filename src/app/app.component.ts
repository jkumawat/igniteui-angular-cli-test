import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IgniteUI Angualr2 Control Test!';

  // Editors
  public editors: any;

  // Combo
  public options: IgCombo;
  public northwind: any;
  public combo: any;

  // Grid
  private gridOptions: IgGrid;
  private id: string;
  private gridReady: boolean = false;
  gridObject: any = {
    results: [] = []
  };
  private rowId: number = 0;

  // paging
  private totalPages: number[] = [];
  private totalPagesCount: number = 0;
  private calcPaging: boolean = false;
  private pageSize: number = 5;
  private selectedPage: number = 1;
  private recordsPerPage: number[] = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];


  constructor() {
    // code for Editors
    this.editors = {
      currency: 12.1,
      date: new Date(),
      editor: 'Infragistics',
      mask: '134-134-134',
      numeric: 123,
      percent: 0.12,
      text: 'Ignite UI'
    };

    // Code For Combo
    this.northwind = [];

    this.options = {
      valueKey: 'ProductID',
      textKey: 'ProductName',
      dataSource: this.northwind,
      width: '100%'
    };

    this.combo = {
      value1: 20,
      value2: 'Chang'
    };


  }


  public loadGrid(event: any) {
    this.initGridData();
    this.dataBindHandler(event, null);
    this.initPaging();
    this.gridReady = true;
  }

  public initPaging() {
    if (this.gridObject.results !== undefined && this.gridObject.results.length > 0) {
      this.totalPagesCount = Math.ceil(this.gridObject.results.length / this.pageSize);
      this.totalPages = [];
      for (let i = 1; i <= this.totalPagesCount; i++) {
        this.totalPages.push(i);
      }
    }
  }

  cellRightClick(event: any, ui: any) {
    console.log(event);
    if (event.ui.row) {
      let selectedRow: any = {
        RecordId: event.ui.row[event.ui.rowKey].childNodes[0].innerText,
        RecordName: event.ui.row[event.ui.rowKey].childNodes[1].innerText,
        RecordDescription: event.ui.row[event.ui.rowKey].childNodes[2].innerText
      };

      console.log(selectedRow);
    }
  }

  dataRenderingHandle(event: any, ui: any) {

    if (event) {
      let colArray: Array<any> = event.ui.owner.options.columns;

      colArray.forEach(item => {
        if (item.key === 'Type') { item.hidden = true; }
        if (item.key === 'Link') { item.hidden = true; }
        if (item.key === 'Fragments') { item.hidden = true; }
      });
    }
  }

  public loadData(event: any) {

    this.gridObject.results = [];
    for (let i = 0; i < this.pageSize; i++) {
      this.gridObject.results.push({
        RecordId: ++this.rowId,
        RecordName: 'test ' + this.rowId,
        RecordDescription: 'test description',
        Fragments: 1, Link: null, Type: null
      });

      let ui: any;
      this.dataBindHandler(event, ui);
    }

    this.initPaging();
  }

  public initGridData() {

    this.id = 'MySample-Grid';

    this.gridObject.results = [];
    for (let i = 0; i < this.pageSize; i++) {
      this.gridObject.results.push({
        RecordId: ++this.rowId,
        RecordName: 'test ' + this.rowId,
        RecordDescription: 'test description',
        Fragments: 1, Link: null, Type: null
      });

    }


    this.gridOptions = {
      width: '100%',
      height: '400px',
      autoCommit: true,
      autoGenerateColumns: true,
      primaryKey: 'RecordId',
      features: [
        {
          name: 'Updating',
          editMode: 'none',
          rowAdded: function (evt: any, ui: any) {
            console.log('Row Added Event fired');
          },
          rowAdding: function (evt: any, ui: any) {
            console.log('row addind function called');
            return false;
          }
        },
        {
          name: 'Filtering'
        },
        {
          name: 'Sorting'
        },
        {
          name: 'Resizing',
        }
      ]
    };
  }

  public dataBindHandler(event, ui) {
    // event handler code    
    let newGridOptions = this.gridOptions;
    newGridOptions.dataSource = this.gridObject.results;
    this.gridOptions = newGridOptions;
  }

  public onPageSizeChage(newPageSize: number, masterSearchKey: string): void {
    this.pageSize = newPageSize;
    this.selectedPage = 1;
    this.calcPaging = true;

    let event: any;
    this.loadData(event);
  }

  public onPageSelectionChage(selectedPage: any): void {
    this.selectedPage = selectedPage;
  }
}
