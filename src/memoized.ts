import { CoreNode, accessibleProps } from "./CoreNode";
import { createNode } from "./createNode";

export const createMemoizedTree = (amount) => {
    // create a tree using Map
    const nodesMap = new Map<number, CoreNode>();
    let nodeId = 0;
    const rootNode = createNode(nodeId);
    nodesMap.set(nodeId, rootNode);

    // add a bg node
    const bgNode = createNode(nodeId++);
    bgNode.parentId = 0;
    rootNode.childrenIds.push(nodeId);

    nodesMap.set(nodeId, bgNode);

    // add a bunch of children to the root node
    Array.from({length: amount}).forEach(() => {
        const node = createNode(nodeId++);
        node.parentId = bgNode.id;
        bgNode.childrenIds.push(node.id);
        nodesMap.set(nodeId, node);

        // every other id add a child in between
        const childNode = createNode(nodeId++);
        childNode.parentId = node.id;
        node.childrenIds.push(childNode.id);
        nodesMap.set(nodeId, childNode);

        const imageNode = createNode(nodeId++);
        imageNode.parentId = childNode.id;
        childNode.childrenIds.push(imageNode.id);
        nodesMap.set(nodeId, imageNode);
    });

    return nodesMap;
}

export const runMemoized = (tree: any) => {
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

        tree.set(node.id, node);

        // access a parent property
        if (!node.parent === null) {
            const parentProp = accessibleProps[Math.floor(Math.random() * accessibleProps.length)];
            const parentId = node.parentId;
            const parent = tree.get(parentId);
            const parentValue = parent[parentProp];
            if (parentValue === undefined) {
                node.parent[parentProp] = Math.random();
            }

            tree.set(parentId, parent);
        }
    }

    tree.forEach((node: any) => {
        checkNode(node);
    });

    const end = performance.now();
    const delta = end - start;

    console.log(`Memoized search: Time to traverse ${delta.toFixed(2)}ms nodes: ${nodes}`);

    return delta;
}