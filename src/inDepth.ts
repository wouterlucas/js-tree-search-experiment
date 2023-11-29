import { accessibleProps } from "./CoreNode";

// setup test to traverse the tree
export const runInDepth = (tree: any) => {
    const start = performance.now();
    let nodes = 0;
    // in depth tree traversal
    const checkNode = (node: any) => {
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            nodes++;
    
            if (!child || child?.worldAlpha === 0) {
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
        
            checkNode(child);
        }

        return nodes;
    }

    checkNode(tree);
    const end = performance.now();
    const delta = end - start;

    console.log(`In-depth search: Time to traverse ${delta.toFixed(2)}ms nodes: ${nodes}`);

    return delta;
}