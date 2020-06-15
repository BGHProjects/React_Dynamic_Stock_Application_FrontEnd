import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useHistory } from "react-router-dom";


export default function StockSearch(props) {

  const history = useHistory();
  const[stockData] = useState();

  const token = localStorage.getItem("token");


  function storeStockData(data)
  {
    localStorage.setItem('stockData', JSON.stringify(data));
  }

  //In-application routing logic
  //Sending user to appropriate page, whether they are logged in or not
  function sendToStockDetails(event)
  {
    if (token === "")
    {
      history.push("/stockdetails", stockData);
    }
    else if (token !== "")
    {
      history.push("/stockdetailsauth", stockData);
    }
  }

  const[stocksRowData, setStockRowData] = useState();
  
  const stockColumns = [
      { headerName: "Name", field: "name", cellStyle: {color: '#ffa500','background-color': "#020e30"}},
      { headerName: "Symbol", field: "symbol", cellStyle: {color: '#ffa500','background-color': "#111e6c"} },
      { headerName: "Industry", field: "industry", filter: true, cellStyle: {color: '#ffa500','background-color': "#020e30"}}
    ];
    
    const API = "http://131.181.190.87:3000";
    const url =`${API}/stocks/symbols`;

    useEffect(() => {
      fetch(url)
      .then(res => res.json())
      .then(data => 
        data.map(stock => {
          return {
            name: stock.name,
            symbol: stock.symbol,
            industry: stock.industry
          };
        })
      )
      .then(stocks => setStockRowData(stocks));
    }, []);
  
  
  return(

    
    <div className="StockSearchContent">
      <h2 className="SearchTitle">StockSearch</h2>
    
    <div 
    className="ag-theme-balham"
    style={{
      height: "300px",
      width: "600px",
      textAlign: "center",
      color: "blue",
      backgroundColor: "blue"
    }}
    >
      <AgGridReact
        columnDefs={stockColumns}
        rowData={stocksRowData}
        pagination={true}
        paginationPageSize={50}
        rowSelection='single'
        onRowClicked={e => (storeStockData(e.node.data), sendToStockDetails(e))}
        cellClassRules={"blue"}
        />
      
      
        
      </div>
    </div>
  ); 
  
}