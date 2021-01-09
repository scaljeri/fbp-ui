import { IFbpNode, FbpNodeId, IFbpConnection, FbpConnectionId } from '@scaljeri/fbp-core';

export interface IFbpInnerState {
    nodes: Record<FbpNodeId, IFbpNode>;                     // Node config objects (copied from IFbpState)
    connections: Record<FbpConnectionId, IFbpConnection>;   // Connection objects (copied from IFbpState)
    nodeIds: IFbpNode[];                                    // order of nodes (inited from IFbpState), last interacted node is last element in this list
}
