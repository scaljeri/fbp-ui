import { FbpNodeId, IFbpNode } from '@scaljeri/fbp-core';

export class NewInnerState {
    static readonly type = '[InnerState] Update';
}

export class UpdateInnerNode {
    static readonly type = '[InnerState] UpdateNode';
    constructor(public payload: IFbpNode) { }
}

export class ActivateNode {
    static readonly type = '[Node] Activate';
    constructor(public payload: FbpNodeId) { }
}
