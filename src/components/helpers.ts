  export const isEmpty = (obj = {}) => {
    return Object.keys(obj).length === 0
  }
    
  export const isNumber = (value: any) => {
    return typeof value == 'number' && !isNaN(value)
  }
  
  export const isNil = (value: any) => {
    return typeof value === 'undefined' || value === null
  }

  export const readValue = (accessor: any, row: any) => {
    var value;
    switch(accessor){
      case 'createdAt':
        value = parseInt(row['timestamp']['$numberLong']);
        break;
      case 'destinationAmount':
        if (row['destinationAmountDetails'] == null){
          value = '-'
        }
        else{
          value = parseInt(row['destinationAmountDetails']['transactionAmount'])
        }
        break;
      case 'destinationCurrency':
        if (row['destinationAmountDetails'] == null){
          value = '-'
        }
        else{
          value = row['destinationAmountDetails']['transactionCurrency']
        }
        break;
      case 'originAmount':
        if (row['originAmountDetails'] == null){
          value = '-'
        }
        else{
          value = parseInt(row['originAmountDetails']['transactionAmount'])
        }
        break;
      case 'originCurrency':
        if (row['originAmountDetails'] == null){
          value = '-'
        }
        else{
          value = row['originAmountDetails']['transactionCurrency']
        }
        break;
      case 'destinationUserId':
          value = parseInt(row['destinationUserId'])
        break;
      case 'originUserId':
          value = parseInt(row['originUserId'])
        break;
      default:
        value = row[accessor] ? row[accessor] : "-"
        break;
    }
    return value;
  }
  
  export const filterRows = (rows: any, filters: any) => {
    if (isEmpty(filters)) return rows
  
    return rows.filter((row: any) => {
      return Object.keys(filters).every((accessor) => {
        var value = readValue(accessor, row);
        const searchValue = filters[accessor];

        value = value.toString();
        return value.toLowerCase().startsWith(searchValue.toLowerCase())
      })
    })
  }
  
  export const sortRows = (rows: any, sort: any) => {
  
    if (sort == null){
      return rows;
    }

    return rows.sort((a:any, b: any) => {
      const { order, orderBy } = sort
     
      const aVal =  readValue(orderBy, a);
      const bVal =  readValue(orderBy, b);

      if (isNil(aVal)) return 1
      if (isNil(bVal)) return -1
      
      if (typeof aVal == 'number'){
        if (order === 'asc'){
          return aVal - bVal;
        }
        else{
          return bVal - aVal;
        }
      }
  
      if (order === 'asc') {
        return aVal.localeCompare(bVal, 'en', { numeric: isNumber(bVal) })
      } else {
        return bVal.localeCompare(aVal, 'en', { numeric: isNumber(aVal) })
      }
    })
  }
  
  export const paginateRows = (sortedRows: any, activePage: any, rowsPerPage: any) => {
    return [...sortedRows].slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage)
  };
