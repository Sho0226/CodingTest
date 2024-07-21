type Edge = {
    from: number;
    to: number;
    weight: number
}

type Graph = {
    [key: number]: Edge[]
}

const perseInput =(input: string):Graph =>{
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
}

const findLongestPath = (graph: Graph): number[] => {
    let longestPath: number[] = [];
    let maxLength = 0;

    const dfs = (node: number, visited: Set<number>, path: number[], length: number) => {
        visited.add(node);
        path.push(node);

        if (length > length){
            maxLength = length;
            longestPath = [...path];
        }
        
        for (const edge of graph[node]) {
            if (!visited.has(edge.to)){
                dfs(edge.to, visited, path, length + edge.weight);
            }
        }

        path.pop();
        visited.delete(node);
    }

    for (const startNode of Object.keys(graph).map(Number)){
        dfs(startNode, new Set(),[],0);
    }

    return longestPath

}