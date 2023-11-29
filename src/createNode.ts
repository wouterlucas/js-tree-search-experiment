import { CoreNode } from "./CoreNode";

export const createNode = (id: number) => {
    return new CoreNode(this, {
        id: id,
        x: Math.random() * 1920 -20,
        y: Math.random() * 1080 -20,
        width:  Math.random() * 200,
        height: Math.random() * 200,
        alpha: Math.random(),
        clipping: Math.random() > 0.5,
        color: Math.random() * 100,
        colorTop: Math.random() * 100,
        colorBottom : Math.random() * 100,
        colorLeft : Math.random() * 100,
        colorRight : Math.random() * 100,
        colorTl : Math.random() * 100,
        colorTr : Math.random() * 100,
        colorBl : Math.random() * 100,
        colorBr : Math.random() * 100,
        zIndex : Math.random() * 100,
        zIndexLocked : Math.random() * 100,
        scaleX : Math.random() * 100,
        scaleY : Math.random() * 100,
        mountX : Math.random() * 100,
        mountY : Math.random() * 100,
        mount : Math.random() * 100,
        pivot : Math.random() * 100,
        pivotX : Math.random() * 100,
        pivotY : Math.random() * 100,
        rotation : Math.random() * Math.PI * 2,
        parent: null,
        texture: null,
        textureOptions: null,
        shader: null,
        shaderProps: null,
    });
}