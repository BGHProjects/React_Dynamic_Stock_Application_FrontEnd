import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


export default function StockDetails() {

  const sData = JSON.parse(localStorage.getItem('stockData'));

  const[stocksRowData, setStockRowData] = useState();

  
    //Columns have alternating shades of blue, and light orange text
   const stockColumns = [
      { headerName: "Date", field: "date", width: "100", cellStyle: {color: '#ffa500','background-color': "#020e30"} },
      { headerName: "Open", field: "open", width: "100", cellStyle: {color: '#ffa500','background-color': "#111e6c"} },
      { headerName: "High", field: "high", width: "100", cellStyle: {color: '#ffa500','background-color': "#020e30"} },
      { headerName: "Low", field: "low", width: "100", cellStyle: {color: '#ffa500','background-color': "#111e6c"}},
      { headerName: "Close", field: "close", width: "100", cellStyle: {color: '#ffa500','background-color': "#020e30"}},
      { headerName: "Volumes", field: "volumes", width: "100", cellStyle: {color: '#ffa500','background-color': "#111e6c"}}
    ];

    const API = "http://131.181.190.87:3000";
    const url =`${API}/stocks/${sData.symbol}`;


    useEffect(() => {
      fetch(url)
      .then(res => res.json())
      .then(stock => {
          return [{
            date: (stock.timestamp).substring(0,10),
            open: stock.open,
            high: stock.high,
            low: stock.low,
            close: stock.close,
            volumes: stock.volumes
          }];
        })
      .then(stocks => setStockRowData(stocks));
    }, []);
    
  
  return (
    <div className="StockDetailsContent">

      <h2 className="DetailsPageTitle">{sData.symbol} - {sData.name}</h2>

      <div 
      className="ag-theme-balham"
      style={{
        height: "300px",
        width: "605px"
      }}
      >

      <AgGridReact
        columnDefs={stockColumns}
        rowData={stocksRowData}
        pagination={true}
        paginationPageSize={50}
        />
        
      
      </div>
    </div>
    
    
  )
}