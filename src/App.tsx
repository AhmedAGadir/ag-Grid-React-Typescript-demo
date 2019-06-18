import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community';
import 'ag-grid-enterprise';
import { GridApi } from 'ag-grid-community';

class App extends Component {
  state: any;
  gridApi: GridApi;
  columnApi: any;

  constructor(props: any) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "make", sortable: true, filter: true
      }, {
        headerName: "Model", field: "model", sortable: true, filter: true
      }, {
        headerName: "Price", field: "price", sortable: true, filter: true
      }],
      rowData: null,
      autoGroupColumnDef: {
        headerName: "Model",
        field: "model",
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          checkbox: true
        }
      }

    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;


    fetch('https://api.myjson.com/bins/15psn9')
      .then(result => result.json())
      .then(rowData => this.setState({ rowData }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '600px'
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          onGridReady={this.onGridReady.bind(this)}
          groupSelectsChildren={true}
          rowSelection="multiple"
          autoGroupColumnDef={this.state.autoGroupColumnDef}>
        </AgGridReact>
      </div>
    );
  }
}

export default App;

