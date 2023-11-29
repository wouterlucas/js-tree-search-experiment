import { createNode } from './createNode';

export const createTree = (amount) => {
    // construct a classic tree
    let nodeId = 0;
    const rootNode = createNode(nodeId);

    // add a bg node
    const bgNode = createNode(nodeId++);
    bgNode.parent = rootNode;

    // add a bunch of children to the root node
    Array.from({length: amount}).forEach(() => {
        const node = createNode(nodeId++);
        node.parent = bgNode;

        const childNode = createNode(nodeId++);
        childNode.parent = node;

        const imageNode = createNode(nodeId++);
        imageNode.parent = childNode;
    });

    return rootNode;
}