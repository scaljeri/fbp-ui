import { SocketsManager } from '../utils/classes/sockets-manager';

export interface IFbpActiveNode {
    id: string;
}

// export interface IFbpChildNodeConfig {
//     readonly id: string;
//     readonly socketService: SocketsManager;
// }

export interface IFbpInnerState {
    activeNodes: IFbpActiveNode[];
}
