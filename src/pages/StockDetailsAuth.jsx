import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import {Line} from "react-chartjs-2";


const token = localStorage.getItem("token");


export default function StockDetailsAuth() {

  const stringSdata = localStorage.getItem('stockData');
  const sData = JSON.parse(stringSdata);

  const[stocksRowData, setStockRowData] = useState();

  //First header (date) includes logic that compares
  //the selected date with the dates mapped from the API
  //by converting the mapped date into a Date() format
  //to properly compare the values
   const stockColumns = [
      { headerName: "Date", filter: "agDateColumnFilter", 

      filterParams: {
        comparator: function(filterlocalDateAtMidnight, cellValue) {
          let dateAsString = cellValue;

          if (dateAsString === null) {
            return 0;
          }

          let dateParts = dateAsString.split('-');
          let day = Number(dateParts[2]);
          let month = Number(dateParts[1]) - 1;
          let year = Number(dateParts[0]);

          let cellDate = new Date(year, month, day);

          if (cellDate < filterlocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterlocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        }
      },
      
      
      field: "date", width: "100", cellStyle: {color: '#ffa500','background-color': "#020e30"} },
      { headerName: "Open", field: "open", width: "100", cellStyle: {color: '#ffa500','background-color': "#111e6c"} },
      { headerName: "High", field: "high", width: "100", cellStyle: {color: '#ffa500','background-color': "#020e30"} },
      { headerName: "Low", field: "low", width: "100", cellStyle: {color: '#ffa500','background-color': "#111e6c"}},
      { headerName: "Close", field: "close", width: "100", cellStyle: {color: '#ffa500','background-color': "#020e30"}},
      { headerName: "Volumes", field: "volumes", width: "100", cellStyle: {color: '#ffa500','background-color': "#111e6c"}}
    ];

    const API = "http://131.181.190.87:3000";

    const url = `${API}/stocks/authed/${sData.symbol}?from=2019-11-06T00%3A00%3A00.000Z&to=2020-03-24T00%3A00%3A00.000Z`;
    
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    

     useEffect(() => {
      fetch(url, {headers})
      .then(res => res.json())
      .then(data => 
        data.map(stock => {
          return {
            date: (stock.timestamp).substring(0,10),
            open: stock.open,
            high: stock.high,
            low: stock.low,
            close: stock.close,
            volumes: stock.volumes
          };
        })
      )
      .then(stocks => setStockRowData(stocks));
    }, []); 

    //The following two for loops are used to retrieve
    //the data that is relevant to the generation
    //of the graph
    
    let closes = [];
    let x;

    for(x in stocksRowData)
    {
      closes.push(stocksRowData[x].close);
    }

    
    let dates = [];
    let y;

    for(y in stocksRowData)
    {
      dates.push(stocksRowData[y].date);
    }
    

  return (
    <div className="StockDetailsContent">

      <h2 className="DetailsPageTitle">{sData.symbol} - {sData.name}</h2>

      <div 
      className="ag-theme-balham"
      style={{
        height: "300px",
        width: "610px",
        textAlign: "center"
      }}
      >

        

      <AgGridReact
        columnDefs={stockColumns}
        rowData={stocksRowData}
        pagination={true}
        paginationPageSize={50}
        />

      <div>
          <Line data={{labels: dates,
        datasets: [
          {
            label: "Level of Data",
            data: closes,
            borderWidth:5,
            borderColor: ["rgba(255,165,0,50)"]
            
          }
        ]}} options={{
            responsive: true,
            title: {text: 'Stock Prices Data'},
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
                
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
                
          }}
            />
        </div>
        
      </div>
    </div>
    
    
  )
}