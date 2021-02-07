import React from 'react'

const AverageTop30Contacted = ({ avgTop30Contacted }) => {
    return (
        <div>
            <center><h1>Average top 30 contacted</h1></center>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Average Price</h5>
                    <p className="card-text"> € {avgTop30Contacted}, -</p>
                </div>
            </div>

        </div>
    )
};

export default AverageTop30Contacted