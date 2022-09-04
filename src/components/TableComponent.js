const cities = [
    {id: '1', name: 'Moscow'},
    {id: '2', name: 'Yekaterinburg'},
    {id: '3', name: 'Kiev'},
    {id: '4', name: 'Pskov'},
]

export const TableComponent = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {cities.map(el => {
                    return (
                        <tr key={el.id}>
                            <td>{el.id}</td>
                            <td>{el.name}</td>
                        </tr>
                    )})}
            </tbody>
        </table>
    )
}