import json
import sys
import os
from priorityqueue import PriorityQueue


class PathFinder(object):
    def __init__(self, path_to_graph: str):
        self.graph = self._load_graph(path_to_graph)

    def find_path(self, start_node: str, finish_node: str) -> (list, int):
        priority_queue = PriorityQueue()
        priority_queue.put(start_node, 0)
        graph_path = {}
        nodes_cost = {}
        graph_path[start_node] = None
        nodes_cost[start_node] = 0
        while not priority_queue.is_empty():
            current_node = priority_queue.pop()

            if current_node == finish_node:
                break

            for node, weight in self.graph[current_node].items():
                new_cost = nodes_cost[current_node] + weight
                if node not in graph_path or new_cost < nodes_cost[node]:
                    nodes_cost[node] = new_cost
                    priority_queue.put(node, new_cost)
                    graph_path[node] = current_node

        return self._build_path(graph_path, start_node, finish_node), nodes_cost[finish_node]

    def _load_graph(self, path_to_graph: str) -> dict:
        with open(path_to_graph, 'r') as file:
            return json.loads(file.read())

    def _build_path(self, graph_path, start_node, finish_node) -> list:
        current_node = finish_node
        path = []
        while current_node != start_node:
            path.append(current_node)
            current_node = graph_path[current_node]
        path.append(start_node)
        path.reverse()
        return path


if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise Exception("Invalid number of arguments")
    start_node = sys.argv[0] or '1'
    finish_node = sys.argv[1] or '6'
    pathfinder = PathFinder('graph.json')
    path, path_cost = pathfinder.find_path(start_node, finish_node)
    print('Path - {},{} Cost - {}'.format(path, os.linesep, path_cost))
