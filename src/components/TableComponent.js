import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";
import {useTable, useSortBy, useFilters} from "react-table";
import {removeCity} from "../store/commonSlice";
import {matchSorter} from 'match-sorter'


function DefaultColumnFilter({
                                 column: {filterValue, preFilteredRows, setFilter},
                             }) {
    const count = preFilteredRows.length

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
}

fuzzyTextFilterFn.autoRemove = val => !val


export const TableComponent = () => {

    const cities = useSelector(state => state.common.cities)
    const dispatch = useDispatch()

    const deleteHandler = (e) => {
        dispatch(removeCity(e.target.value))
    }

    const data = useMemo(
        () => cities, [cities]
    )

    const columns = useMemo(
        () => [
            {
                Header: 'City name',
                accessor: 'name'
            },
            {
                Header: 'Country code',
                accessor: 'countryCode'
            },
            {
                Header: 'Latitude',
                accessor: 'latitude'
            },
            {
                Header: 'Longitude',
                accessor: 'longitude'
            },
            {
                Header: 'Options',
                accessor: 'id',
                Cell: ({cell}) => {
                    return <button value={cell.row.values.id} onClick={deleteHandler}>Delete</button>
                }
            }
        ],
        []
    )

    const filterTypes = useMemo(
        () => ({
            fuzzyText: fuzzyTextFilterFn,
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data, defaultColumn, filterTypes}, useFilters, useSortBy)

    if (!cities.length) {
        return <span>Add some city</span>
    }

    return (
        <table {...getTableProps()} style={{border: 'solid 1px blue'}}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            style={{
                                borderBottom: 'solid 3px red',
                                background: 'aliceblue',
                                color: 'black',
                                fontWeight: 'bold',
                            }}
                        >
                            {column.render('Header')}
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                            <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
                  </span>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td
                                    {...cell.getCellProps()}
                                    style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                        background: 'papayawhip',
                                    }}
                                >
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

filterGreaterThan.autoRemove = val => typeof val !== 'number'
