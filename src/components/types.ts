export interface Transaction{
    destinationAmountDetails?: {
      transactionCurrency?: string,
      transactionAmount?: number
    },
    transactionState: string,
    originAmountDetails?: {
      transactionCurrency?: string,
      transactionAmount?: number
    },
    timestamp: {
      $numberLong: string,
    },
    transactionId: string;  
    destinationUserId: string;
    originUserId?: string;
    type?: string;
    status: string;
};
  
export interface Column{
    accessor: string,
    label: string
}

export interface Filter{
    [key: string]: string | undefined 
}

export interface Sort{
  order: string,
  orderBy: string
}

export interface Page{
  activePage: number, 
  count: number, 
  rowsPerPage: number, 
  totalPages: number, 
  setActivePage: (page: number) => void
}
