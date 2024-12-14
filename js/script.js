// js/script.js

let arrSize = 50;
let maxValue = 700;
var arr;
const bars_container = document.querySelector('.bars-container');

const header = document.getElementsByClassName("header-container")[0];

let isSorting = false;

document.addEventListener('DOMContentLoaded', () => {
    const sizeSlider = document.getElementById('arrSize');
    const speedSlider = document.getElementById('speed');
    const sizeValue = document.getElementById('sizeValue');
    const speedValue = document.getElementById('speedValue');

    sizeSlider.addEventListener('input', () => {
        arrSize = parseInt(sizeSlider.value);
        sizeValue.textContent = arrSize;
        randomize();
    });

    speedSlider.addEventListener('input', () => {
        speed = parseInt(speedSlider.value);
        speedValue.textContent = speed;
    });

    randomize();
});

function showVal() {
    val = document.getElementById('arrSize').value;
    document.getElementById("showarrSize").innerHTML = val;
    randomize();

    arrSize = val;
}

function randomize() {
    isSorting = false;
    if (!bars_container) return;
    bars_container.innerHTML = "";

    // Generate random values between 5 and 95 to ensure bars stay within container
    arr = Array.from({ length: arrSize }, () => Math.floor(Math.random() * 90) + 5);

    for (let i = 0; i < arr.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = arr[i] + "%"; // Use percentage instead of pixels
        bar.style.width = 100 / arr.length + "%"
        bars_container.appendChild(bar);
    }
}

async function sort() {
    if (isSorting) return;
    isSorting = true;

    const sortOption = document.getElementById("sortOptions").value;

    try {
        switch (sortOption) {
            case "bubbleSort":
                await bubbleSort(arr);
                break;
            case "selectionSort":
                await selectionSort(arr);
                break;
            case "insertionSort":
                await insertionSort(arr);
                break;
            case "quickSort":
                await quickSort(arr, 0, arr.length - 1);
                break;
            case "mergeSort":
                await mergeSort(arr, 0, arr.length - 1);
                break;
            case "heapSort":
                await heapSort(arr);
                break;
            case "shellSort":
                await shellSort(arr);
                break;
        }
    } finally {
        isSorting = false;
    }
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let lowest = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowest]) {
                lowest = j
            }
        }
        if (lowest !== i) {
            await swap(i, lowest);
        }
    }
}

async function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {
                await swap(j, j + 1);
            }
        }
    }
}

async function insertionSort(arr) {
    const bars = document.getElementsByClassName("bar");
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        bars[i].classList.add("comparing");
        await sleep(25);

        while (j >= 0 && arr[j] > key) {
            bars[j].classList.add("comparing");
            arr[j + 1] = arr[j];
            bars[j + 1].style.height = arr[j] + "%";
            await sleep(25);
            bars[j].classList.remove("comparing");
            j--;
        }

        arr[j + 1] = key;
        bars[j + 1].style.height = key + "%";
        bars[i].classList.remove("comparing");
    }
}

async function swap(i, j) {
    const bars = document.getElementsByClassName("bar");
    const bar1 = bars[i];
    const bar2 = bars[j];

    bar1.classList.add("comparing");
    bar2.classList.add("comparing");

    const tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;

    [arr[i], arr[j]] = [arr[j], arr[i]];

    await sleep(25);

    bar1.classList.remove("comparing");
    bar2.classList.remove("comparing");
}

function sleep(ms) {
    if (!isSorting) throw new Error('Sorting cancelled');
    const baseDelay = 0;
    return new Promise(resolve => setTimeout(resolve, baseDelay + (100 - speed)));
}

async function quickSort(arr, low, high) {
    if (low < high) {
        const pivot = await partition(arr, low, high);
        await quickSort(arr, low, pivot - 1);
        await quickSort(arr, pivot + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            if (i !== j) {
                await swap(i, j);
            }
        }
    }

    if (i + 1 !== high) {
        await swap(i + 1, high);
    }
    return i + 1;
}

async function mergeSort(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }
}

async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        const bars = document.getElementsByClassName("bar");
        bars[k].classList.add("comparing");
        await sleep(25);

        if (L[i] <= R[j]) {
            arr[k] = L[i];
            bars[k].style.height = L[i] + "%";
            i++;
        } else {
            arr[k] = R[j];
            bars[k].style.height = R[j] + "%";
            j++;
        }
        bars[k].classList.remove("comparing");
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        const bars = document.getElementsByClassName("bar");
        bars[k].style.height = L[i] + "%";
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        const bars = document.getElementsByClassName("bar");
        bars[k].style.height = R[j] + "%";
        j++;
        k++;
    }
}

async function heapSort(arr) {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        await swap(0, i);
        await heapify(arr, i, 0);
    }
}

async function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        await swap(i, largest);
        await heapify(arr, n, largest);
    }
}

async function shellSort(arr) {
    const n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j;

            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                const bars = document.getElementsByClassName("bar");
                bars[j].classList.add("comparing");
                bars[j - gap].classList.add("comparing");

                arr[j] = arr[j - gap];
                bars[j].style.height = arr[j] + "%";  // Changed from px to %

                await sleep(25);

                bars[j].classList.remove("comparing");
                bars[j - gap].classList.remove("comparing");
            }
            arr[j] = temp;
            const bars = document.getElementsByClassName("bar");
            bars[j].style.height = temp + "%";  // Changed from px to %
        }
    }
}

const algorithmInfo = {
    bubbleSort: {
        name: "Bubble Sort",
        description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)"
    },
    selectionSort: {
        name: "Selection Sort",
        description: "Divides the array into a sorted and unsorted region, repeatedly selects the smallest element from the unsorted region.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)"
    },
    insertionSort: {
        name: "Insertion Sort",
        description: "Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)"
    },
    quickSort: {
        name: "Quick Sort",
        description: "Uses a divide-and-conquer strategy, picks a 'pivot' element and partitions the array around it.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)"
    },
    mergeSort: {
        name: "Merge Sort",
        description: "A divide-and-conquer algorithm that recursively breaks down the array into smaller subarrays until each has only one element.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)"
    },
    heapSort: {
        name: "Heap Sort",
        description: "Uses a binary heap data structure to sort elements, converting the array into a max heap and repeatedly extracting the maximum.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)"
    },
    shellSort: {
        name: "Shell Sort",
        description: "An optimization of insertion sort that allows the exchange of items that are far apart, reducing the number of swaps required.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)"
    }
};

// Update the info panel when algorithm is selected
document.getElementById('sortOptions').addEventListener('change', (e) => {
    const info = algorithmInfo[e.target.value];
    document.getElementById('algorithmInfo').innerHTML = `
        <h3>${info.name}</h3>
        <p>${info.description}</p>
        <div class="complexity-info">
            <p><strong>Time Complexity:</strong> ${info.timeComplexity}</p>
            <p><strong>Space Complexity:</strong> ${info.spaceComplexity}</p>
        </div>
    `;
    randomize();
});
