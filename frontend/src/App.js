import React, { Component } from 'react'
import AvgTop30Contacted from './components/Average30Contacted'
import AverageListing from './components/AverageListing'
import Distributions from './components/Distributions'
import Top5perMonth from './components/Top5PerMonth'
import FileUpload from './components/UploadFile'

class App extends Component {
    state = {
        averageListing: {},
        distributions: [],
        top5PerMonth: { "": [] },
        averge30TopContacted: "",
        selectedFile: null,
        loaded: 0
    };

    componentDidMount() {
        fetch('http://localhost:8080/Averge30TopContacted')
            .then(res => res.json())
            .then((data) => {
                this.setState({ averge30TopContacted: data })
            })
            .catch(console.log)
        fetch('http://localhost:8080/averageListing')
            .then(res => res.json())
            .then((data) => {
                this.setState({ averageListing: data })
            })
            .catch(console.log)
        fetch('http://localhost:8080/distributions')
            .then(res => res.json())
            .then((data) => {
                this.setState({ distributions: data })
            })
            .catch(console.log)
        fetch('http://localhost:8080/top5PerMonth')
            .then(res => res.json())
            .then((data) => {
                this.setState({ top5PerMonth: data })
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="container">
                <AvgTop30Contacted avgTop30Contacted={this.state.averge30TopContacted} />
                <AverageListing averageListing={this.state.averageListing} />
                <Distributions distributions={this.state.distributions} />
                <Top5perMonth top5PerMonth={this.state.top5PerMonth} />
                <FileUpload />
            </div>
        )
    }
}

export default App;