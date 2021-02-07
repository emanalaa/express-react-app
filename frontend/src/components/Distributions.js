import React from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Make</th>
                <th>Distribution</th>
            </tr>
        </thead>
    );
}

const TableRow = ({ value }) => {
    return (
        <tr >
            <td>{value[0]}</td>
            <td>{value[1]}%</td>
        </tr>
    );
}
const Distributions = ({ distributions }) => {
    return (
        <div>
            <center><h1>Percentual distributions of available cars by make</h1></center>
            <div className="card">
                <table>
                    <TableHeader />
                    <tbody>
                        {
                            distributions.map((distribution) => (
                                <TableRow value={distribution} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Distributions