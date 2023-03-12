import { useState, useMemo, useEffect } from 'react';
import { sortRows, filterRows, paginateRows, readValue } from './utilities';
import { Pagination } from './Pagination';
import { Transaction, Column, Filter } from './types';
import { getTransactions, TOTAL_LENGTH } from "./transaction";
import Switch from "react-switch";
import '../assets/css/Table.css';

const columns = [
  { accessor: 'transactionId', label: 'Transaction id' },
  { accessor: 'createdAt', label: 'Created at' },
  { accessor: 'destinationAmount', label: 'Destination amount' },
  { accessor: 'destinationCurrency', label: 'Destination currency' },
  { accessor: 'destinationUserId', label: 'Destination userId' },
  { accessor: 'originAmount', label: 'Origin amount' },
  { accessor: 'originCurrency', label: 'Origin currency' },
  { accessor: 'originUserId', label: 'Origin userId' },
  { accessor: 'type', label: 'Transaction type' },
  { accessor: 'status', label: 'Transaction status' },
];

export const Table = () => {

  var emptyTransactions = new Array<Transaction>();
  var emptyFilters: Filter = {};

  const [loading, setLoading] = useState(false);
  const [filteringToggle, setFilteringToggle] = useState(false);
  const [sortingToggle, setSortingToggle] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });
  const [filters, setFilters] = useState(emptyFilters);
  const [transactions, setTransactions] = useState(emptyTransactions);

  // TODO: Give option for the user to select rowsPerPage.
  const rowsPerPage = 10
  const count = TOTAL_LENGTH;
  const totalPages = Math.ceil(count / rowsPerPage)

  const filteredRows = useMemo(() => filterRows(transactions, filters), [transactions, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])  
  const calculatedRows = paginateRows(sortedRows, 1, rowsPerPage)
  
  // To perform Sorting and Filtering in the Mock API itself, use below code instead and
  // also uncomment the fetchTransactions and corresponding useEffect.    
  // const calculatedRows = paginateRows(transactions, 1, rowsPerPage);

  const fetchTransactions = async () => {
    console.log("calling api with page: " + activePage);

    setLoading(true);
    const { data, total } = await getTransactions({
      page: activePage,
      rowsPerPage: rowsPerPage,
      // filter: filters,
      // sort: sort
    });

    setTransactions(data);
    setLoading(false);

    console.log("Recieved data: ");
    console.log(data);
    console.log(total);
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [activePage]);
  // }, [activePage, filters, sort]);

  const handleSearch = (value:string, accessor:string) => {
    setActivePage(1)

    if (value) {
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters: any) => {
        const updatedFilters = { ...prevFilters }
        delete updatedFilters[accessor]

        return updatedFilters
      })
    }
  }

  const handleSort = (accessor:string) => {
    setActivePage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters(emptyFilters);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            { columns.map((column : Column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return '⬆️'
                  }
                  return '⬇️'
                } else {
                  return '️🔁'
                }
              }
              return (
                <th key={column.accessor} className="tableCols">
                  <div className='column_label'>
                  <span>{column.label}</span>
                  <div>
                    { sortingToggle && <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button> }
                  </div>
                  </div>
                </th>
              )
            })}
          </tr>
          <tr>
            { filteringToggle && 
              columns.map((column: Column) => {
              if (column.accessor === "status"){
                return (
                  <th>
                    <select
                      key={`${column.accessor}-search`}
                      onChange={(event) => handleSearch(event.target.value, column.accessor)}
                      className="filter-input" 
                    >
                      <option value="Filter">Filter</option>
                      <option value="ALLOW">ALLOW</option>
                      <option value="FLAG">FLAG</option>
                    </select>
                  </th>
                )
              }
              else{
                return (
                  <th>
                    <input
                      key={`${column.accessor}-search`}
                      type="search"
                      placeholder={`Filter ${column.label}`}
                      value={filters[column.accessor]}
                      onChange={(event) => handleSearch(event.target.value, column.accessor)}
                      className="filter-input"
                    />
                  </th>
                )
              }
            })}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
            return (
              <tr key={row.id}>
                { !loading 
                  && columns.map((column) => {
                    const value = readValue(column.accessor, row);
                    return <td key={column.accessor}>{ value }</td>  
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )}
      <div className='toggle-group'>
        <label>
          <span className='toggle-font'> Toggle Filtering</span>
          <Switch onChange={() => setFilteringToggle(!filteringToggle)} checked={filteringToggle} className="toggle"/>
        </label>
        <label>
          <span className='toggle-font'> Toggle Sorting</span>
          <Switch onChange={() => setSortingToggle(!sortingToggle)} checked={sortingToggle} className="toggle"/>
        </label>
      </div>
      <div>
        <button onClick={clearAll} className="cta-btn">Clear all</button>
      </div>
    </div>
  )
}
