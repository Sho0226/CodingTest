type Edge = {
    from: number;
    to: number;
    weight: number;
};

type Graph = {
    [key: number]: Edge[];
};

const parseInput = (input: string): Graph => {
    const lines = input.trim().split('\r\n'); 
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

    console.log('Parsed Graph:', graph); 
    return graph;
};

const findLongestPath = (graph: Graph): number[] => {
    let longestPath: number[] = [];
    let maxLength = 0;

    const dfs = (node: number, visited: Set<number>, path: number[], length: number) => {
        visited.add(node);
        path.push(node);

        console.log(`Visiting node ${node}, current path: ${path}, current length: ${length}`);

        if (length > maxLength) {
            maxLength = length;
            longestPath = [...path];
            console.log(`New longest path found: ${longestPath}, length: ${maxLength}`);
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
        console.log(`Starting DFS from node ${startNode}`); 
        dfs(startNode, new Set(), [], 0);
    }

    return longestPath;
};

const input = `1, 2, 10.0\r\n2, 3, 15.0\r\n3, 4, 20.0\r\n4, 5, 25.0\r\n5, 1, 30.0\r\n2, 4, 5.0`;

const graph = parseInput(input); 
const longestPath = findLongestPath(graph); 

console.log('Longest Path:', longestPath);

for (const node of longestPath) {
    console.log(node);
}
