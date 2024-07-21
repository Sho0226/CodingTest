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
        const [fromStr, toStr, weightStr] = line.split(',').map(s => s.trim()); // 各行をカンマで分割してトリム
        const from = parseInt(fromStr); // 始点IDを整数に変換
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