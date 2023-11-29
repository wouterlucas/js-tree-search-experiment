import { runInDepth } from './src/inDepth';
import { runBreadthFirst } from './src/breadthFirst';
import { createTree } from './src/createTree';

import { runMemoized, createMemoizedTree } from './src/memoized';
import { runBst, createBstTree } from './src/binaryTree';

const AMOUNT_OF_RUNS = 5;
const AMOUNT_OF_NODES = 400;

const runInDepthTests = () => {
    const indepthAverages: number[] = [];

    // run the tests 10 times
    Array.from({length: AMOUNT_OF_RUNS}).forEach(() => {
        const tree = createTree(AMOUNT_OF_NODES);
        indepthAverages.push(runInDepth(tree as any));
    });

    // calcaulate the average
    const indepthAverage = indepthAverages.reduce((acc, curr) => acc + curr, 0) / indepthAverages.length;
    console.log(`In-depth search: Average time to traverse ${indepthAverage.toFixed(2)}ms`);

    const element = document.getElementById('indepth');
    if (element) {
        element.innerHTML = `In-depth search: Average time to traverse ${indepthAverage.toFixed(2)}ms`;
    }

    runBreadthFirstTests();
}

const runBreadthFirstTests = () => {
    const breadthfirstAverages: number[] = [];

    // run the tests 10 times
    Array.from({length: AMOUNT_OF_RUNS}).forEach(() => {
        const tree = createTree(AMOUNT_OF_NODES);
        breadthfirstAverages.push(runBreadthFirst(tree as any));
    });

    // calcaulate the average
    const breadthfirstAverage = breadthfirstAverages.reduce((acc, curr) => acc + curr, 0) / breadthfirstAverages.length;
    console.log(`Breadth-first search: Average time to traverse ${breadthfirstAverage.toFixed(2)}ms`);

    const element = document.getElementById('breadthfirst');
    if (element) {
        element.innerHTML = `Breadth-first search: Average time to traverse ${breadthfirstAverage.toFixed(2)}ms`;
    }

    runMemoizedTests();
}

const runMemoizedTests = () => {
    const memoizedAverages: number[] = [];

    // run the tests 10 times
    Array.from({length: AMOUNT_OF_RUNS}).forEach(() => {
        const tree = createMemoizedTree(AMOUNT_OF_NODES);
        memoizedAverages.push(runMemoized(tree as any));
    });

    // calcaulate the average
    const memoizedAverage = memoizedAverages.reduce((acc, curr) => acc + curr, 0) / memoizedAverages.length;
    console.log(`Memoized search: Average time to traverse ${memoizedAverage.toFixed(2)}ms`);

    const element = document.getElementById('memoized');
    if (element) {
        element.innerHTML = `Memoized search: Average time to traverse ${memoizedAverage.toFixed(2)}ms`;
    }

    runBstTests();
}



const runBstTests = () => {
    const bstAverages: number[] = [];

    // run the tests 10 times
    Array.from({length: AMOUNT_OF_RUNS}).forEach(() => {
        const tree = createBstTree(AMOUNT_OF_NODES);
        bstAverages.push(runBst(tree as any));
    });

    // calcaulate the average
    const bstAverage = bstAverages.reduce((acc, curr) => acc + curr, 0) / bstAverages.length;
    console.log(`BST search: Average time to traverse ${bstAverage.toFixed(2)}ms`);

    const element = document.getElementById('bst');
    if (element) {
        element.innerHTML = `BST search: Average time to traverse ${bstAverage.toFixed(2)}ms`;
    }
}

// start our test chain
setTimeout(() => {
    runInDepthTests();
}, 100);