
export interface CoreNodeProps {
    id: number;
    // External facing properties whose defaults are determined by
    // RendererMain's resolveNodeDefaults() method
    x: number;
    y: number;
    width: number;
    height: number;
    alpha: number;
    clipping: boolean;
    color: number;
    colorTop: number;
    colorBottom: number;
    colorLeft: number;
    colorRight: number;
    colorTl: number;
    colorTr: number;
    colorBl: number;
    colorBr: number;
    parent: CoreNode | null;
    zIndex: number;
    texture: null;
    textureOptions: null;
    shader: null;
    shaderProps: Record<string, unknown> | null;
    zIndexLocked: number;
    scaleX: number;
    scaleY: number;
    mount: number;
    mountX: number;
    mountY: number;
    pivot: number;
    pivotX: number;
    pivotY: number;
    rotation: number;
}

// list all properties we can access
export const accessibleProps = [
    'x',
    'y',
    'width',
    'height',
    'alpha',
    'clipping',
    'color',
    'colorTop',
    'colorBottom',
    'colorLeft',
    'colorRight',
    'colorTl',
    'colorTr',
    'colorBl',
    'colorBr',
    'zIndex',
    'zIndexLocked',
    'scaleX',
    'scaleY',
    'mount',
    'mountX',
    'mountY',
    'pivot',
    'pivotX',
    'pivotY',
    'rotation',
];

export class CoreNode {
    protected props: Required<CoreNodeProps>;
    readonly children: CoreNode[] = [];

    // needed for memoization
    public id: Number = 0;
    public parentId: Number = 0;
    public childrenIds: Number[] = [];

    public worldAlpha = 1;

    constructor(protected stage: any, props: CoreNodeProps) {
        this.props = {
          ...props,
          parent: null,
        };
        // Allow for parent to be processed appropriately
        this.parent = props.parent;
    }

    get zIndex(): number {
        const props = this.props;
        const z = props.zIndex || 0;
        const p = props.parent?.zIndex || 0;
    
        return z;
    }
    
    set zIndex(value: number) {
        this.props.zIndex = value;
    }


    get parent(): CoreNode | null {
        return this.props.parent;
    }
    
    set parent(newParent: CoreNode | null) {
        const oldParent = this.props.parent;
        if (oldParent === newParent) {
            return;
        }

        this.props.parent = newParent;
        if (oldParent) {
            const index = oldParent.children.indexOf(this);
            // assertTruthy(index !== -1,"CoreNode.parent: Node not found in old parent's children!",);
            oldParent.children.splice(index, 1);
        }

        if (newParent) {
            newParent.children.push(this);
        }

    }

}