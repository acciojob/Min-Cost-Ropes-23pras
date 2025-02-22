class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();
        let min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown(0);
        return min;
    }

    sinkDown(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.sinkDown(smallest);
        }
    }

    size() {
        return this.heap.length;
    }
}

function mincost(arr) {
    if (arr.length <= 1) return 0;  // If there's only one or no rope, cost is 0

    let minHeap = new MinHeap();
    arr.forEach(num => minHeap.insert(num));

    let totalCost = 0;

    while (minHeap.size() > 1) {
        let first = minHeap.extractMin();
        let second = minHeap.extractMin();
        let cost = first + second;
        totalCost += cost;
        minHeap.insert(cost);
    }

    return totalCost;
}

module.exports = mincost;
