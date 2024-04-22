/*
 * Main scripts file for the Algorithm visualizer website.
 */

let arrSize = 50;
let maxValue = 700;
var arr;

const header = document.getElementsByClassName("header-container")[0];
const bars_container = document.getElementsByClassName("bars-container")[0];


header.innerHTML += "<button type='button' onclick='randomize()'>RANDOMIZE!</button>";
header.innerHTML += "<SELECT id='sortOptions'><OPTION Value='bubbleSort'>Bubble Sort</OPTION><OPTION Value='selectionSort'>Selection Sort</OPTION></SELECT>";
header.innerHTML += "<button type='button' onclick='sort()'>SORT!</button>";
header.innerHTML += "<div class='slider'><label for='arrSize'>Size</label><input type='range' oninput='showVal()' value='50' min='3' max='500' class='slider' id='arrSize'><div class='show' id='showarrSize'></div></div>";

randomize();

function showVal(){
    val = document.getElementById('arrSize').value;
    document.getElementById("showarrSize").innerHTML = val;
    randomize();

    arrSize = val;
}

function randomize(){   
    bars_container.innerHTML = "";
    arr = Array.from({length: arrSize}, () => Math.floor(Math.random() * maxValue));

    for(i = 0 ; i < arr.length ; i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = arr[i] + "px";
        bar.style.width = 100/arr.length + "%"
        bars_container.appendChild(bar);
    }
}

function sort(){
    var sortOption = document.getElementById("sortOptions").value;

    if (sortOption == "bubbleSort"){
        bubbleSort(arr);
    } else if (sortOption == "selectionSort"){
        selectionSort(arr);
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
        let bar1 = document.getElementsByClassName("bar")[i];
        let bar2 = document.getElementsByClassName("bar")[lowest];

        [arr[i], arr[lowest]] = [arr[lowest], arr[i]];

        bar1.style.backgroundColor = "green";
        bar2.style.backgroundColor = "green";

        barSwap(bar1, bar2);

        await sleep(25);
            
        bar1.style.backgroundColor = "aqua";
        bar2.style.backgroundColor = "aqua";
      }
    }
}

async function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {
                let bar1 = document.getElementsByClassName("bar")[j];
                let bar2 = document.getElementsByClassName("bar")[j+1];

                bar1.style.backgroundColor = "green";
                bar2.style.backgroundColor = "green";
            
                barSwap(bar1, bar2);
            
                await sleep(25);
            
                bar1.style.backgroundColor = "aqua";
                bar2.style.backgroundColor = "aqua";

                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}

function insertionSort(arr)  
{  
    let i, key, j;  
    for (i = 1; i < arr.length; i++) 
    {  
        key = arr[i];  
        j = i - 1;  
   
        while (j >= 0 && arr[j] > key) 
        {  
            arr[j + 1] = arr[j];  
            j = j - 1;  
        }  
        arr[j + 1] = key;  
    }  
}  

function barSwap(bar1, bar2){
    var height1 = bar1.style.height;
    var height2 = bar2.style.height;
    bar2.style.height = height1;
    bar1.style.height = height2;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
