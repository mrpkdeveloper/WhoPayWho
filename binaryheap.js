// using heap reduces time to nlogn from n^2
// left child at 2K+1 and right at 2K+2
export { BinaryHeap };
class BinaryHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  empty() {
    return this.size() == 0;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleup();
  }

  bubbleup() {
    let index = this.size() - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentindex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentindex];

      if (parent[0] > element[0]) {
        break;
      }

      this.heap[parentindex] = element;
      this.heap[index] = parent;
      index = parentindex;
    }
  }

  extractMax() {
    const max = this.heap[0];
    const last = this.heap.pop();

    if (!this.empty()) {
      this.heap[0] = last;
      this.sinkdown(0);
    }

    return max;
  }

  sinkDown(index) {
    let largest = index;
    let leftchildind = 2 * index + 1;
    let rightchildind = 2 * index + 2;
    let length = this.size();

    if (
      leftchildind < length &&
      this.heap[largest][0] < this.heap[leftchildind][0]
    ) {
      largest = leftchildind;
    }
    if (
      rightchildind < length &&
      this.heap[largest][0] < this.heap[rightchildind][0]
    ) {
      largest = rightchildind;
    }
    if (largest != index) {
      let temp = this.heap[largest];
      this.heap[largest] = this.heap[index];
      this.heap[index] = temp;
      this.sinkDown(largest);
    }
  }
}

//   let maxheap = new binaryheap();
//   maxheap.insertvalue([4, 1]);
//   maxheap.insertvalue([3, 1]);
// maxheap.insertvalue([6, 1]);
// maxheap.insertvalue([1, 1]);

// console.log(maxheap);

// while (!maxheap.empty()) {
//   console.log(maxheap.extractmax());
// }
// console.log("hello");
