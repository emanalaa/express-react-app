import React from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Ranking</th>
                <th>Listing Id</th>
                <th>Make</th>
                <th>Selling Price</th>
                <th>Mileage</th>
                <th>Total amount of contacts</th>
            </tr>
        </thead>
    );
}

const TableRow = ({ value }) => {
    return (
        <tr >
            <td>{value.Ranking}</td>
            <td>{value.ListingId}</td>
            <td>{value.Make}</td>
            <td> € {value.SellingPrice}, -</td>
            <td>{value.Mileage} KM</td>
            <td>{value.NumberOfContacts}</td>
        </tr>
    );
}

const Top5PerMonth = ({ top5PerMonth }) => {
    return (
        <div>
            <center><h1>The top 5 most contacted listings per Month</h1></center>
            <div className="card">
                {
                    Object.entries(top5PerMonth).map(([key, values]) => (
                        <div>
                            <h4>Month: {key}</h4>
                            <table>
                                <TableHeader />
                                <tbody>
                                    {
                                        values.map((value) => (
                                            <TableRow value={value} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Top5PerMonth