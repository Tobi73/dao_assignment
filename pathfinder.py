import json
import sys
import os


class PathFinder(object):
    def __init__(self, path_to_graph: str):
        self.graph = self._load_graph(path_to_graph)

    def find_path(self, start_node: str, finish_node: str) -> (list, int):
        node_potentials = []
        node_potentials.insert(0, (start_node, 0))
        graph_path = {}
        nodes_cost = {}
        graph_path[start_node] = None
        nodes_cost[start_node] = 0
        while not len(node_potentials) == 0:
            current_node = self._get_node_with_most_potential(node_potentials)[0]

            if current_node == finish_node:
                break

            for node, weight in self.graph[current_node].items():
                new_cost = nodes_cost[current_node] + weight
                if node not in graph_path or new_cost < nodes_cost[node]:
                    nodes_cost[node] = new_cost
                    node_potentials.append((node, new_cost))
                    graph_path[node] = current_node

        return self._build_path(graph_path, start_node, finish_node), nodes_cost[finish_node]

    def _load_graph(self, path_to_graph: str) -> dict:
        with open(path_to_graph, 'r') as file:
            return json.loads(file.read())

    def _build_path(self, graph_path: dict, start_node: str, finish_node: str) -> list:
        current_node = finish_node
        path = []
        while current_node != start_node:
            path.append(current_node)
            current_node = graph_path[current_node]
        path.append(start_node)
        path.reverse()
        return path

    def _get_node_with_most_potential(self, node_potentials: list) -> (str, int):
        most_potential_node = node_potentials[0]
        for node_potential in node_potentials:
            node_potential_path = node_potential[1]
            most_potential_node_path = most_potential_node[1]
            if node_potential_path < most_potential_node_path:
                most_potential_node = node_potential
        node_potentials.remove(most_potential_node)
        return most_potential_node


if __name__ == '__main__':
    if len(sys.argv) < 3:
        raise Exception("Invalid number of arguments")
    start_node = sys.argv[1]
    finish_node = sys.argv[2]
    pathfinder = PathFinder('graph.json')
    path, path_cost = pathfinder.find_path(start_node, finish_node)
    print('Path from node {} to node {} - {},{} Cost - {}'.format(start_node,
                                                                finish_node, 
                                                                path, os.linesep, path_cost))
