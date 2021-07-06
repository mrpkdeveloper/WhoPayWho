// splitwise code algo
const V = 3;

// [to ,from, money]
let E = [
  [0, 1, 100],
  [1, 2, 50],
  [2, 0, 40],
];

let netarr = [];
for (let i = 0; i < V; i++) {
  let amcredit = 0;
  let amdebit = 0;
  for (let j = 0; j < V; j++) {
    if (E[j][0] == i) {
      amdebit = amdebit + E[j][2];
    }
    if (E[j][1] == i) {
      amcredit = amcredit + E[j][2];
    }
  }
  netarr[i] = amcredit - amdebit;
}
let count = 0;
function settlement(netarr) {
  let i = 0;
  let j = netarr.length - 1;
  while (i < j) {
    let lo = netarr[i];
    let hi = netarr[j];
    let settlementamt = Math.min(-lo, hi);
    netarr[i] += settlementamt;
    netarr[j] -= settlementamt;
    console.log(i + " pays " + settlementamt + " to " + j);
    if (netarr[i] == 0) {
      i++;
    }
    if (netarr[j] == 0) {
      j--;
    }
    count++;
  }
}

// netarr.sort(); 
console.log(netarr);
settlement(netarr);
// console.log(netarr);
console.log(count);
