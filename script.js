import { BinaryHeap } from "./heap.js";

onload = function () {
  // create a network
  let curr_data;
  // const container = document.getElementById("mynetwork");
  const container2 = document.getElementById("mynetwork2");
  const graphcontainer = document.getElementById("container2");
  // const genNew = document.getElementById("generate-graph");
  const solve = document.getElementById("solve");
  const temptext = document.getElementById("temptext");

  // getting friend name and amt paid
  const nof = document.getElementById("nof");
  const addfriendbtn = document.getElementById("addfriend");
  const addfrienddiv = document.getElementById("friendslist");

  // initialise graph options
  const options = {
    edges: {
      arrows: { to: { enabled: true } },
      color: "orange",
      labelHighlightBold: true,
      font: {
        size: 20,
      },
    },
    nodes: {
      font: "12px arial red",
      scaling: {
        label: true,
      },
      shape: "icon",
      icon: {
        face: "FontAwesome",
        code: "\uf183",
        size: 40,
        color: "#991133",
      },
    },
  };

  let network2 = new vis.Network(container2);
  network2.setOptions(options);

  addfriendbtn.onclick = function () {
    addfrienddiv.style.display = "block";
    graphcontainer.style.display = "flex";
    solve.style.display = "block";
    addfriendbtn.disabled = true;
    let n = parseInt(nof.value);
    for (let i = 0; i < n; i++) {
      console.log("hello");
      dynamicdivadd(i);
    }
  };

  function dynamicdivadd(i) {
    var div = document.createElement("div");
    div.className = "col-auto";
    var div2 = document.createElement("div");
    div2.className = "row";
    div.appendChild(div2);

    var div3 = document.createElement("div");
    div3.className = "col";
    var inputname = document.createElement("input");
    inputname.className = "form-control inputname";
    inputname.autocomplete = "off";
    inputname.id = `fname${i}`;
    inputname.placeholder = `Friend ${i + 1} `;
    div3.appendChild(inputname);

    var div4 = document.createElement("div");
    div4.className = "col";
    var inputamt = document.createElement("input");
    inputamt.className = "form-control inputamt";
    inputamt.autocomplete = "off";
    inputamt.id = `famt${i}`;
    inputamt.placeholder = "amt paid";
    div4.appendChild(inputamt);

    div2.appendChild(div3);
    div2.appendChild(div4);

    addfrienddiv.appendChild(div);
    var br = document.createElement("br");
    addfrienddiv.appendChild(br);
  }

  solve.onclick = function () {
    const data = createData();
    curr_data = data;
    temptext.style.display = "none";
    container2.style.display = "inline";
    const solvedData = solveData();
    network2.setData(solvedData);
  };

  function createData() {
    // const sz = Math.floor(Math.random() * 8) + 2;

    // Adding people to nodes array
    let nodes = [];
    let n = parseInt(nof.value);
    for (let i = 0; i < n; i++) {
      var idname = `fname${i}`;
      var fname = document.getElementById(idname).value;
      nodes.push({ id: i + 1, label: fname });
    }

    nodes = new vis.DataSet(nodes);

    var totalamt = 0;
    for (let i = 0; i < n; i++) {
      var idamt = `famt${i}`;
      var famt = document.getElementById(idamt).value;
      totalamt += parseInt(famt);
    }

    console.log(typeof totalamt);
    console.log(typeof nof.value);
    const nofv = parseInt(nof.value);
    console.log(typeof nofv);
    const amtperhead = Math.floor(totalamt / nofv);
    console.log(amtperhead);

    var netvaluearr = [];
    for (let i = 0; i < n; i++) {
      var idamt = `famt${i}`;
      var famt = document.getElementById(idamt).value;
      netvaluearr[i] = parseInt(famt) - amtperhead;
    }

    console.log(netvaluearr);

    const data = {
      nodes: nodes,
      // edges: edges,
      netvaluearr: netvaluearr,
    };
    return data;
  }

  function solveData() {
    // console.log(f1name.value + " " + f1amt.value);

    let data = curr_data;
    const sz = data["nodes"].length;
    // const vals = Array(sz).fill(0);
    const vals = data.netvaluearr;

    const pos_heap = new BinaryHeap();
    const neg_heap = new BinaryHeap();

    for (let i = 0; i < sz; i++) {
      if (vals[i] > 0) {
        pos_heap.insert([vals[i], i]);
      } else {
        neg_heap.insert([-vals[i], i]);
        vals[i] *= -1;
      }
    }

    const new_edges = [];
    while (!pos_heap.empty() && !neg_heap.empty()) {
      const mx = pos_heap.extractMax();
      const mn = neg_heap.extractMax();

      const amt = Math.min(mx[0], mn[0]);
      const to = mx[1];
      const from = mn[1];

      new_edges.push({
        from: from + 1,
        to: to + 1,
        label: String(Math.abs(amt)),
      });
      vals[to] -= amt;
      vals[from] -= amt;

      if (mx[0] > mn[0]) {
        pos_heap.insert([vals[to], to]);
      } else if (mx[0] < mn[0]) {
        neg_heap.insert([vals[from], from]);
      }
    }

    data = {
      nodes: data["nodes"],
      edges: new_edges,
    };
    return data;
  }
};
