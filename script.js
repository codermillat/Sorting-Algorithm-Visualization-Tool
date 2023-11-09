const algorithmBtns = document.querySelectorAll('.sorting-button');
const generateBtn = document.getElementById('generate-btn');
const arraySizeInput = document.getElementById('array-size');
const barsContainer = document.querySelector('.bars-container');
const timeComplexityElement = document.getElementById('time-complexity');
const spaceComplexityElement = document.getElementById('space-complexity');
const cCodeElement = document.getElementById('c-code');
const cppCodeElement = document.getElementById('cpp-code');
const pythonCodeElement = document.getElementById('python-code');
const javaCodeElement = document.getElementById('java-code');

let algorithm = 'insertionSort';
let numbers = [];



function loadCodeFromFile(language, codeElementId) {
    // Define the filename corresponding to the language (e.g., c-code.txt, cpp-code.txt, etc.)
    const filename = language.toLowerCase() + '-code.txt';

    fetch(filename) // Fetch the content of the text file
        .then(response => response.text())
        .then(code => {
            // Set the fetched code to the code element
            const codeElement = document.getElementById(codeElementId);
            codeElement.textContent = code;
        })
        .catch(error => {
            console.error('Error fetching code: ', error);
        });
}

loadCodeFromFile('C', 'c-code');
loadCodeFromFile('Cpp', 'cpp-code');
loadCodeFromFile('Python', 'python-code');
loadCodeFromFile('Java', 'java-code');

algorithmBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        algorithm = event.target.id.replace('-btn', '');
        updateDetails(algorithm); // Pass the algorithm name to the function
        changeAlgorithmDescription(algorithm);
        updateVisualization();
    });
});


function changeAlgorithmDescription(algorithm) {
    // Get all description elements
    const descriptions = document.querySelectorAll('.algorithm-description');

    // Hide all descriptions
    descriptions.forEach(description => {
        description.classList.add('hidden');
    });

    // Get the selected description
    const descriptionId = algorithm + '-description';
    const selectedDescription = document.getElementById(descriptionId);

    // Show the selected description
    if (selectedDescription) {
        selectedDescription.classList.remove('hidden');

        // Update the title and content based on the selected description
        const titleElement = document.getElementById('algorithm-description-title');
        const contentElement = document.getElementById('algorithm-description-content');
        titleElement.textContent = selectedDescription.querySelector('h2').textContent;
        contentElement.textContent = selectedDescription.querySelector('p').textContent;
    }
}



generateBtn.addEventListener('click', () => {
    const size = parseInt(arraySizeInput.value);
    if (size <= 0) {
        alert('Please enter a valid array size.');
        return;
    }

    numbers = generateRandomNumbers(size);
    updateVisualization();
    updateDetails(algorithm);
});

function generateRandomNumbers(size) {
    const numbers = [];
    for (let i = 0; i < size; i++) {
        numbers.push(Math.floor(Math.random() * 100) + 1);
    }
    return numbers;
}

arraySizeInput.addEventListener('input', (event) => {
    const size = parseInt(event.target.value);
    if (!isNaN(size)) {
        generateRandomArray(size);
        updateVisualization();
    }
});

function sortNumbers(algorithm, numbers) {
    const copy = [...numbers]; // Create a copy of the array to avoid modifying the original
    switch (algorithm) {
        case 'insertionSort':
            return insertionSort(copy);
            break;
        // Add cases for other sorting algorithms here
        case 'selectionSort':
            return selectionSort(copy);
            break;

        case 'bubbleSort':
            return bubbleSort(copy);
            break;

        case 'mergeSort':
            return mergeSort(copy);
            break;

        case 'quickSort':
            return quickSort(copy);
            break;

        case 'heapSort':
            return heapSort(copy);
            break;
        default:
            return copy;
    }
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let currentElement = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > currentElement) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = currentElement;
    }
    return arr;
}


function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (i !== minIndex) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}


function bubbleSort(numbers) {
    const n = numbers.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (numbers[i] > numbers[i + 1]) {
                [numbers[i], numbers[i + 1]] = [numbers[i + 1], numbers[i]];
                swapped = true;
            }
        }
    } while (swapped);

    return numbers;
}



function mergeSort(numbers) {
    if (numbers.length <= 1) {
        return numbers;
    }

    const mid = Math.floor(numbers.length / 2);
    const left = mergeSort(numbers.slice(0, mid));
    const right = mergeSort(numbers.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

function quickSort(numbers) {
    if (numbers.length <= 1) {
        return numbers;
    }

    const pivot = numbers[0];
    const left = [];
    const right = [];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < pivot) {
            left.push(numbers[i]);
        } else {
            right.push(numbers[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}


function heapSort(numbers) {
    buildHeap(numbers);

    for (let i = numbers.length - 1; i > 0; i--) {
        [numbers[0], numbers[i]] = [numbers[i], numbers[0]];
        heapify(numbers, 0, i);
    }

    return numbers;
}

function buildHeap(numbers) {
    for (let i = Math.floor(numbers.length / 2) - 1; i >= 0; i--) {
        heapify(numbers, i, numbers.length);
    }
}

function heapify(numbers, parentIndex, endIndex) {
    const leftChildIndex = 2 * parentIndex + 1;
    const rightChildIndex = 2 * parentIndex + 2;

    let largestIndex = parentIndex;

    if (leftChildIndex < endIndex && numbers[leftChildIndex] > numbers[largestIndex]) {
        largestIndex = leftChildIndex;
    }

    if (rightChildIndex < endIndex && numbers[rightChildIndex] > numbers[largestIndex]) {
        largestIndex = rightChildIndex;
    }

    if (largestIndex !== parentIndex) {
        [numbers[parentIndex], numbers[largestIndex]] = [numbers[largestIndex], numbers[parentIndex]];
        heapify(numbers, largestIndex, endIndex);
    }
}


function updateVisualization() {
    barsContainer.innerHTML = ''; // Clear existing content

    const randomArray = numbers.slice(); // Copy the original array
    displayArray(randomArray, 'Random Array:', barsContainer);

    // Sort the array and display each step
    const sortedArray = sortNumbers(algorithm, randomArray);
    for (let i = 0; i < sortedArray.length; i++) {
        displayArray(sortedArray.slice(0, i + 1), 'Sorting Step:', barsContainer);
    }

    displayArray(sortedArray, 'Sorted Array:', barsContainer);

    const descriptionElement = document.getElementById('algorithm-description');
    descriptionElement.textContent = algorithmDescriptions[algorithm] || "No description available.";

}


function displayArray(array, stepText, container) {
    const stepElement = document.createElement('div');
    stepElement.textContent = `${stepText} ${array.join(' ')}`;
    container.appendChild(stepElement);
}




function updateDetails(algorithm) {
    const algorithmNameElement = document.getElementById('algorithm-name');
    const timeComplexityElement = document.getElementById('time-complexity');
    const spaceComplexityElement = document.getElementById('space-complexity');
    const cCodeElement = document.getElementById('c-code');
    const cppCodeElement = document.getElementById('cpp-code');
    const pythonCodeElement = document.getElementById('python-code');
    const javaCodeElement = document.getElementById('java-code');

    algorithmNameElement.textContent = algorithm;

    switch (algorithm) {
        case 'insertionSort':
            timeComplexityElement.textContent = 'O(n^2)';
            spaceComplexityElement.textContent = 'O(1)';
            cCodeElement.textContent = loadCodeFromFile('C', 'c-code');
            cppCodeElement.textContent = loadCodeFromFile('Cpp', 'cpp-code');
            pythonCodeElement.textContent = loadCodeFromFile('Python', 'python-code');
            javaCodeElement.textContent = loadCodeFromFile('Java', 'java-code');
            break;
        case 'selectionSort':
            timeComplexityElement.textContent = 'O(n^2)';
            spaceComplexityElement.textContent = 'O(1)';
            cCodeElement.textContent = 'Selection Sort C Code';
            cppCodeElement.textContent = 'Selection Sort C++ Code';
            pythonCodeElement.textContent = 'Selection Sort Python Code';
            javaCodeElement.textContent = 'Selection Sort Java Code';
            break;
        case 'bubbleSort':
            timeComplexityElement.textContent = 'O(n^2)';
            spaceComplexityElement.textContent = 'O(1)';
            cCodeElement.textContent = 'Bubble Sort C Code';
            cppCodeElement.textContent = 'Bubble Sort C++ Code';
            pythonCodeElement.textContent = 'Bubble Sort Python Code';
            javaCodeElement.textContent = 'Bubble Sort Java Code';
            break;
        case 'mergeSort':
            timeComplexityElement.textContent = 'O(n log n)';
            spaceComplexityElement.textContent = 'O(n)';
            cCodeElement.textContent = 'Merge Sort C Code';
            cppCodeElement.textContent = 'Merge Sort C++ Code';
            pythonCodeElement.textContent = 'Merge Sort Python Code';
            javaCodeElement.textContent = 'Merge Sort Java Code';
            break;
        case 'quickSort':
            timeComplexityElement.textContent = 'O(n log n) (average), O(n^2) (worst case)';
            spaceComplexityElement.textContent = 'O(log n)';
            cCodeElement.textContent = 'Quick Sort C Code';
            cppCodeElement.textContent = 'Quick Sort C++ Code';
            pythonCodeElement.textContent = 'Quick Sort Python Code';
            javaCodeElement.textContent = 'Quick Sort Java Code';
            break;
        case 'heapSort':
            timeComplexityElement.textContent = 'O(n log n)';
            spaceComplexityElement.textContent = 'O(1)';
            cCodeElement.textContent = 'Heap Sort C Code';
            cppCodeElement.textContent = 'Heap Sort C++ Code';
            pythonCodeElement.textContent = 'Heap Sort Python Code';
            javaCodeElement.textContent = 'Heap Sort Java Code';
            break;
        default:
            timeComplexityElement.textContent = 'N/A';
            spaceComplexityElement.textContent = 'N/A';
            cCodeElement.textContent = 'N/A';
            cppCodeElement.textContent = 'N/A';
            pythonCodeElement.textContent = 'N/A';
            javaCodeElement.textContent = 'N/A';
    }
}

// Initialize the visualization with initial values
updateVisualization();
updateDetails();