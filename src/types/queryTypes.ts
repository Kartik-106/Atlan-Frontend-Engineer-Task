export interface QueryMap {
    [key: string]: {
      table: string;
      filter: string;
    };
  }
  
  export interface TableRowData {
    [key: string]: string | number;
  }
  
  export interface QueryStoreState {
    selectedQuery: string;
    tableData: TableRowData[];
    setQuery: (query: string) => Promise<void>;
  }
  