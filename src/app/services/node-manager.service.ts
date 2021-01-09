import { ElementRef, Injectable } from '@angular/core';
import { NodeComponent } from '../components/node/node.component';
import { Subject } from 'rxjs';
import { IFbpNodeChildConfig } from '../types/node';
import { SocketsManager } from '../utils/classes/sockets-manager';
import { Store } from '@ngxs/store';
import { fbpDispatchEvent } from '../utils/event';
import { IFbpState } from '@scaljeri/fbp-core';

export interface INodeServiceItem {
    nodeId: string;
    parentId: string;
    element: HTMLElement;
    node: NodeComponent;
    nodeChildConfig: IFbpNodeChildConfig;
}

@Injectable({
    providedIn: 'root'
})
export class NodeManagerService {
    contexts: string[] = [];
    private newNodeSubject = new Subject<INodeServiceItem>();
    public newNode$ = this.newNodeSubject.asObservable;

    private removeNodeSubject = new Subject<INodeServiceItem>();
    public removeNode$ = this.newNodeSubject.asObservable;

    public nodeList: INodeServiceItem[] = [];
    public nodeMap: Record<string, INodeServiceItem> = {};
    public test = 1;
    private socketsManagers: Record<string, SocketsManager> = {}

    constructor(private store: Store) {

    }

    // The parent of nodes determines the context for all those nodes
    initialize(element: ElementRef): any {
        const nativEl = element.nativeElement.parentElement;
        const contextId = nativEl.getAttribute('id') || nativEl.getAttribute('class') || 'root';

        if (this.contexts.indexOf(contextId) === -1) {
            this.contexts.push(contextId);

            fbpDispatchEvent('fbp.ready', nativEl, {
                detail: {
                    contextId,
                    init: (state: IFbpState) => console.log('toto: received state'), // this.setState(state)
                }
            });
        }

        return null;
    }


    get activeNode(): INodeServiceItem {
        return this.nodeMap[0];
    }

    getNode(nodeId: string): INodeServiceItem {
        return this.nodeMap[nodeId];
    }

    lookupByHTMLElement(element: HTMLElement): INodeServiceItem | undefined {
        if (element) {
            return this.getNode(element.getAttribute('id')!);
        }
    }

    registerSocketsManager(id: string, socketService: SocketsManager, parentId: string): void {
        this.socketsManagers[id] = socketService;
        // socketService.addParent(this.id, this.socketsManagers[parentId]);
    }

    getSocketsManager(id: string): SocketsManager {
        if (!this.socketsManagers[id]) {
            console.log(`OOOoooooops this should not happen, requested a SocketsManager ${id} but it does not exist yet`);
        }

        return this.socketsManagers[id];
    }

    addNode(nodeId: string, parentId: string, element: HTMLElement, node: NodeComponent, nodeChildConfig: IFbpNodeChildConfig): void {
        if (!parentId && nodeId) {
            parentId = 'root'
        }

        if (!nodeId) {
            nodeId = 'root';
        }

        const item = { nodeId, parentId, element, node, nodeChildConfig };
        this.nodeList.push(item);
        this.nodeMap[nodeId] = item;

        this.newNodeSubject.next(item);

        this.updateChildNodes(nodeId, nodeChildConfig);
    }

    updateChildNodes(parentId: string, childConfig: IFbpNodeChildConfig): void {
        this.nodeList.filter(child => child.parentId === parentId).forEach(item => {
            item.node.setParentConfig(childConfig);
        });
    }

    removeNode(nodeId: string): void {
        const item = this.nodeMap[nodeId];
        this.nodeList.splice(this.nodeList.indexOf(item), 1);
        delete this.nodeMap[nodeId];

        this.removeNodeSubject.next(item);
    }

    // get id(): string {
    //     return this._id || 'root';
    // }

    // set id(id: string) {
    //     this._id = id;
    // }
}
