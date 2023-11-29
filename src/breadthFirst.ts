import { accessibleProps } from './CoreNode';

export const runBreadthFirst = (tree: any) => {
    const start = performance.now();
    let nodes = 0;
    // in depth tree traversal
    const checkNode = (root: any) => {
        const queue = [root];

        while (queue.length > 0) {
            const child = queue.shift();
            nodes++;

            if (!child || child?.worldAlpha === 0) {
                console.error('Node not found or worldAlpha is 0', child);
                continue;
            }

            // access random property
            const randomProp = accessibleProps[Math.floor(Math.random() * accessibleProps.length)];
            const value = child[randomProp];
            if (value === undefined) {
                child[randomProp] = Math.random();
            }

            // access a parent property
            if (!child.parent === null) {
                const parentProp = accessibleProps[Math.floor(Math.random() * accessibleProps.length)];
                const parentValue = child.parent[parentProp];
                if (parentValue === undefined) {
                    child.parent[parentProp] = Math.random();
                }
            }

            for (let i = 0; i < child.children.length; i++) {
                queue.push(child.children[i]);
            }
        }

        return nodes;
    }

    checkNode(tree);

    const end = performance.now();
    const delta = end - start;

    console.log(`Breadth-first search: Time to traverse ${delta.toFixed(2)}ms nodes: ${nodes}`);

    return delta;
}