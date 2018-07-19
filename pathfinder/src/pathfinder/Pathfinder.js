import Node from './Node';
import PathfindingResult from './PathfindingResult';

class PathFinder {
    constructor (graph) {
        this.graph = graph;
    }

    findPath(startNode, finishNode) {
        const nodePotentials = []
        nodePotentials.push(new Node(startNode, 0));
        const graphPath = {};
        const nodesCost = {};
        graphPath[startNode] = null
        nodesCost[startNode] = 0;
        while (nodePotentials.length !== 0) {
            let currentNode = this._popMostPotentialNode(nodePotentials).nodeName
            if (currentNode === finishNode) {
                break;
            }

            Object.entries(this.graph[currentNode]).forEach((entry) => {
                let nodeName = entry[0]
                let pathCost = entry[1]
                let newCost = nodesCost[currentNode] + pathCost;
                if (!(nodeName in graphPath) || newCost < nodesCost[nodeName]) {
                    nodesCost[nodeName] = newCost;
                    nodePotentials.push(new Node(nodeName, newCost));
                    graphPath[nodeName] = currentNode
                }
            })
        }

        return new PathfindingResult(this._buildPath(graphPath, startNode, finishNode), nodesCost[finishNode]);
    }

    _popMostPotentialNode(nodePotentials) {
        let mostPotentialNode = nodePotentials.reduce((currMin, currValue) => currMin.nodePathSum < currValue.nodePathSum 
                                                        ? currMin 
                                                        : currValue)
        nodePotentials.splice(nodePotentials.indexOf(mostPotentialNode), 1);
        return mostPotentialNode;
    }

    _buildPath(graphPath, startNode, finishNode) {
        let currentNode = finishNode;
        const path = [];
        while (currentNode !== startNode) {
            path.push(currentNode);
            currentNode = graphPath[currentNode];
        }
        path.push(currentNode);
        path.reverse();
        return path;
    }
}

export default PathFinder;