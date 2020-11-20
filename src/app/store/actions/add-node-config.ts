import { IFbpPosition } from '@scaljeri/fbp-core';
import { IFbpActiveNode } from 'src/app/types/inner-state';

export interface NodeCoordinate {
    id: string;
    position: IFbpPosition;
}

export class ActivateNode {
    static readonly type = '[Node] Activate';
    constructor(public payload: IFbpActiveNode) { }
}
