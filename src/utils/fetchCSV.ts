import Papa from "papaparse";
import { TableRowData } from "../types/queryTypes";

const fetchAndFilterCSV = async (csvPath: string, filter: string,cols: string[]): Promise<TableRowData[]> => {
  const response = await fetch(csvPath);
  const csvText = await response.text();
  
  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        let filteredData = applyFilter(result.data as TableRowData[], filter);
        filteredData = applyColumnFilter(filteredData,cols );
        console.log(filteredData);
        resolve(filteredData);
      }
    });
  });
};

const applyFilter = (data: TableRowData[], filter: string): TableRowData[] => {
  if (!filter) return data; // No filter applied

  const [column, operator, value] = filter.split(" ");

  return data.filter(row => {
    switch (operator) {
      case ">": return Number(row[column]) > Number(value);
      case "<": return Number(row[column]) < Number(value);
      case "=": return row[column] === value;
      default: return true;
    }
  });
};

const applyColumnFilter = (data: TableRowData[], columns: string[]): TableRowData[] => {
    if (columns.length === 0) return data; // No column filter applied, return all columns
  
    return data.map((row)=>{
        let newRow: TableRowData = {};
        Object.keys(row).forEach((key)=>{
            if(columns.includes(key.toLowerCase())){
                newRow[key] = row[key];
            }
        })
        return newRow;
    }
    );
  };
  


export default fetchAndFilterCSV;
