import React from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Seller Type</th>
                <th>Average in Euro</th>
            </tr>
        </thead>
    );
}

const TableBody = ({ value }) => {
    return (
        <tbody>
            <tr >
                <td>other</td>
                <td> € {value.other}, -</td>
            </tr>
            <tr >
                <td>Dealer</td>
                <td> € {value.dealer}, -</td>
            </tr>
            <tr >
                <td>private</td>
                <td> € {value.private}, -</td>
            </tr>
        </tbody>
    );
}

const AverageListing = ({ averageListing }) => {
    return (
        <div>
            <center><h1>Average Listing</h1></center>

            <div class="card">
                <div class="card-body">
                    <table>
                    <TableHeader />
                    <TableBody value={averageListing} />
                    </table>
                </div>
            </div>

        </div>
    )
};

export default AverageListing