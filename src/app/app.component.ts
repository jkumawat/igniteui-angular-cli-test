import { Component } from '@angular/core';
import { TeamAssignmentModel, TeamGridModel } from './hierarchical-grid-model';

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
  private griddata: Array<any> = new Array<any>();
  private rowId: number = 0;
  private gridControl: any;

  // hierarchical Grid
  private hierarchicalGridOptions: IgHierarchicalGrid;
  private hierarchicalGridID: string;
  private hierarchicalGridReady: boolean = false;
  private hierarchicalGridData: Array<TeamGridModel> = new Array<TeamGridModel>();

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
    this.northwind = [
      { RecordId: 1, RecordName: 'Test -1' },
      { RecordId: 2, RecordName: 'Test -2' },
      { RecordId: 3, RecordName: 'Test -3' },
    ];

    this.options = {
      valueKey: 'RecordId',
      textKey: 'RecordName',
      dataSource: this.northwind,
      width: '100%'
    };

    this.combo = {
      value1: 1,
      value2: 'Test'
    };
  }

  public loadGrid(event: any) {
    this.initGridData();
    this.gridReady = true;
  }

  public dataRenderingHandle(event: any, ui: any) {

    if (event) {
      let colArray: Array<any> = event.ui.owner.options.columns;

      colArray.forEach(item => {
        if (item.key === 'RecordId') { item.hidden = true; }
        if (item.key === 'Type') { item.hidden = true; }
        if (item.key === 'Link') { item.hidden = true; }
        if (item.key === 'Fragments') { item.hidden = true; }
      });
    }
  }

  public rendered(event, ui) {
    this.gridControl = event.ui.owner;

    let localGridControlInstance = this.gridControl;

    localGridControlInstance.container().on('dblclick', function (gridEvt: any, gridUI: any) {
      let rowId = gridEvt.originalEvent.target.parentElement.getAttribute('data-id');
      let rowObject = localGridControlInstance.findRecordByKey(rowId);
      alert('double click event handler');
    });

    localGridControlInstance.igGridUpdating("setCellValue", 1, "RecordName", "Sue");

    console.log(this.gridControl);
  }

  public initGridData() {

    this.id = 'MySample-Grid';

    this.griddata = [];
    for (let i = 0; i < 5; i++) {
      this.griddata.push({
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
          editRowStarting: function (evt: any, ui: any) {
            console.log('Here i can call a method to open Selection Dialog');
            return true;
          },
          rowAdding: function (evt: any, ui: any) {
            console.log('Here i can call a method to add data in RowData for row adding.');
            return true;
          },
          rowDeleting: function (evt: any, ui: any) {
            console.log('Here i can call a method to update rowData for deleting rows.');
            return true;
          },
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


  public loadHierarchicalGrid(event: any) {
    this.hierarchicalGridID = 'MyHierarchicalGrid';

    this.hierarchicalGridOptions = {
      autoCommit: true,
      width: '100%',
      height: '400px',
      dataSource: this.hierarchicalGridData,
      primaryKey: 'roleId',
      autoGenerateColumns: false,
      autoGenerateColumnLayouts: false,
      columns: [
        { key: 'roleId', headerText: 'Role Id', dataType: 'number', hidden: true },
        { key: 'roleName', headerText: 'Role Name', dataType: 'string' },
      ],
      columnLayouts: [
        {
          key: 'assignments',
          responseDataKey: '',
          primaryKey: 'userName',
          autoGenerateColumns: false,
          width: '100%',
          columns: [
            { key: 'userName', headerText: 'User Name', dataType: 'string', hidden: true },
            { key: 'name', headerText: 'Name', dataType: 'string' },
            { key: 'surName', headerText: 'Surname', dataType: 'string' },
            { key: 'givenName', headerText: 'Given Name', dataType: 'string' },
            { key: 'department', headerText: 'Department', dataType: 'string' }
          ]
        }
      ]
    };

    this.hierarchicalGridReady = true;
  }

  public loadHierarchicalData(event: any) {
    for (let i = 1; i < 5; i++) {
      let newModel: TeamGridModel = new TeamGridModel();
      newModel.roleId = i;
      newModel.roleName = 'Role No.' + i;
      newModel.assignments = new Array<TeamAssignmentModel>();
      for (let assign = 0; assign <= i; assign++) {
        let newAssignment: TeamAssignmentModel = new TeamAssignmentModel(assign);
        newModel.assignments.push(newAssignment);
      }

      this.hierarchicalGridData.push(newModel);
    }
  }
}
