import { binaryheap } from "./binaryheap";

function solvedata(data) {
  //no of nodes
  const sz = data["nodes"].length;
  const netvaluearr = Array(sz).fill(0);

  for (let i = 0; i < data["edge"].length; i++) {
    const edge = data["edge"][i];

    // + -> take money  - -> give money
    netvaluearr[edge["to"] - 1] += parseInt(edge["label"]);
    netvaluearr[edge["from"] - 1] -= parseInt(edge["label"]);
  }

  let posheap = new binaryheap();
  let negheap = new binaryheap();

  for (let i = 0; i < sz; i++) {
    if (netvaluearr[i] > 0) {
      posheap.insertvalue([netvaluearr[i], i]);
    } else if (netvaluearr[i] < 0) {
      negheap.insertvalue([-netvaluearr[i], i]);
      netvaluearr[i] *= -1;
    }
  }

  const newedge = [];
  while (!posheap.empty() && negheap.empty()) {
    let max = posheap.extractmax();
    let min = negheap.extractmax();
    let to = max[1];
    let from = min[1];
    let amt = Math.min(max[0], min[0]);

    newedge.push({ from: from + 1, to: (to = 1), label: String(amt) });
    netvaluearr[to] -= amt;
    netvaluearr[from] -= amt;

    if (max[0] > min[0]) {
      posheap.insertvalue([netvaluearr[to], to]);
    } else if (max[0] < min[0]) {
      negheap.insertvalue([netvaluearr[from], from]);
    }
  }

  data = {
    nodes: data["nodes"],
    edges: newedge,
  };

  return data;
}
