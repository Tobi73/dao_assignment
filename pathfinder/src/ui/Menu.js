import Pathfinder from "../pathfinder/Pathfinder";
import React, { Component } from 'react';
import graphImg from '../graph.gif';

class PathfinderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { result: "Choose start and finish node" };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleStartNodeChange = this.handleStartNodeChange.bind(this);
        this.handleFinishNodeChange = this.handleFinishNodeChange.bind(this);
    }

    componentDidMount() {
        fetch("./graph.json")
            .then(res => res.json())
            .then(graph => {
                this.setState({
                    graph: graph
                });
                this.pathfinder = new Pathfinder(this.state.graph);
            });
    }

    handleFormSubmit(event) {
        let startNode = this.state.startNode;
        let finishNode = this.state.finishNode;
        if (startNode in this.state.graph 
            && finishNode in this.state.graph) {
            let result = this.pathfinder.findPath(startNode, finishNode);
            this.setState({
                result: `Path - ${result.path}, Path cost - ${result.pathCost}`
            })
        } else {
            this.setState({
                result: "Invalid input"
            })
        }
        event.preventDefault();
    }

    handleStartNodeChange(event) {
        this.setState({
            startNode: event.target.value
        })
        event.preventDefault();
    }

    handleFinishNodeChange(event) {
        this.setState({
            finishNode: event.target.value
        })
        event.preventDefault();
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <img src={graphImg} width="500" height="200" />
                <h5>{this.state.result}</h5>
                <label>
                    Start node:
                    <input
                        type="text"
                        className="btn btn-primary float-right"
                        onChange={this.handleStartNodeChange} />
                </label>
                <label>
                    Finish node:
                    <input
                        type="text"
                        className="btn btn-primary float-right"
                        onChange={this.handleFinishNodeChange} />
                </label>
                <button
                    type="sumbit"
                    className="btn btn-link float-left">Calculate path</button>
            </form>
        );
    }
}

export default PathfinderMenu;
