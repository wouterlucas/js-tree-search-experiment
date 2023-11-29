import {
    BinarySearchTree,
  } from '@datastructures-js/binary-search-tree';

import { createNode } from './createNode';
import { accessibleProps } from './CoreNode';

export const createBstTree = (amount) => {
    const tree = new BinarySearchTree<any>();
    let nodeId = 0;
    const rootNode = createNode(nodeId);
    tree.insert({ id: rootNode.id, node: rootNode});

    // add a bg node
    const bgNode = createNode(nodeId++);
    bgNode.parentId = 0;
    rootNode.childrenIds.push(nodeId);
    tree.insert({ id: bgNode.id, node: bgNode });

    // add a bunch of children to the root node
    Array.from({length: amount}).forEach(() => {
        const node = createNode(nodeId++);
        node.parentId = bgNode.id;
        bgNode.childrenIds.push(node.id);
        tree.insert({ id: node.id, node: node });

        // every other id add a child in between
        const childNode = createNode(nodeId++);
        childNode.parentId = node.id;
        node.childrenIds.push(childNode.id);
        tree.insert({ id: childNode.id, node: childNode });

        const imageNode = createNode(nodeId++);
        imageNode.parentId = childNode.id;
        childNode.childrenIds.push(imageNode.id);
        tree.insert({ id: imageNode.id, node: imageNode });
    });

    return tree;
}

export const runBst = (tree: any) => {
    const start = performance.now();
    let nodes = 0;
    // in depth tree traversal

    const checkNode = (node: any) => {
        nodes++;

        if (!node || node?.worldAlpha === 0) {
            console.error('Node not found or worldAlpha is 0', node);
            return;
        }

        // access random property
        const randomProp = accessibleProps[Math.floor(Math.random() * accessibleProps.length)];
        const value = node[randomProp];
        if (value === undefined) {
            node[randomProp] = Math.random();
        }

        // access a parent property
        if (!node.parent === null) {
            const parentProp = accessibleProps[Math.floor(Math.random() * accessibleProps.length)];
            const parentId = node.parentId;
            const parent = tree.get(parentId);
            const parentValue = parent[parentProp];
            if (parentValue === undefined) {
                node.parent[parentProp] = Math.random();
            }
        }
    }

    tree.traverseInOrder((node: any) => {
        checkNode(node);
    });

    const end = performance.now();
    const delta = end - start;

    console.log(`BST search: Time to traverse ${delta.toFixed(2)}ms nodes: ${nodes}`);

    return delta;
}