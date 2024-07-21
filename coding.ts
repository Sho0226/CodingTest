type Edge = {
    from: number;
    to: number;
    weight: number;
};

type Graph = {
    [key: number]: Edge[];
};

const parseInput = (input: string): Graph => {
    const lines = input.trim().split('\n');
    const graph: Graph = {};

    for (const line of lines) {
        const [fromStr, toStr, weightStr] = line.split(',').map(s => s.trim());
        const from = parseInt(fromStr);
        const to = parseInt(toStr);
        const weight = parseFloat(weightStr);

        if (!graph[from]) {
            graph[from] = [];
        }
        if (!graph[to]) {
            graph[to] = [];
        }

        graph[from].push({ from, to, weight });
    }
    return graph;
};

const findLongestPath = (graph: Graph): number[] => {
    let longestPath: number[] = [];
    let maxLength = 0;

    const dfs = (node: number, visited: Set<number>, path: number[], length: number) => {
        visited.add(node);
        path.push(node);

        if (length > maxLength) {
            maxLength = length;
            longestPath = [...path];
        }

        for (const edge of graph[node]) {
            if (!visited.has(edge.to)) {
                dfs(edge.to, visited, path, length + edge.weight);
            }
        }

        path.pop();
        visited.delete(node);
    };

    for (const startNode of Object.keys(graph).map(Number)) {
        dfs(startNode, new Set(), [], 0);
    }

    return longestPath;
};

const input = `1, 2, 10.0
2, 3, 15.0
3, 4, 20.0
4, 5, 25.0
5, 1, 30.0
2, 4, 5.0`;

const graph = parseInput(input); 
const longestPath = findLongestPath(graph); 

console.log('Longest Path:', longestPath);

for (const node of longestPath) {
    console.log(node); 
}
