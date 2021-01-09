import { FbpNodeId, IFbpPosition } from '@scaljeri/fbp-core';

export interface NodeCoordinate {
    id: string;
    position: IFbpPosition;
}

export class ActivateNode {
    static readonly type = '[Node] Activate';
    constructor(public payload: FbpNodeId) { }
}
