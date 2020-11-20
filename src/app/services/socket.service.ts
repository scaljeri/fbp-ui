import { Injectable } from '@angular/core';
import { IFbpSocket } from '@scaljeri/fbp-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NodeManagerService } from './node-manager.service';

export interface IFbpSocketEmitValue {
    type: 'click' | 'drag';
    socket: IFbpSocket;
};
@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private parentSubjects: Record<string, BehaviorSubject<IFbpSocketEmitValue>> = {};

    constructor(private nodeManager: NodeManagerService) {}

    emit(sourceNodeId: string, parentNodeId: string, value: IFbpSocketEmitValue): void {
        // if (this.nodeManager.activeNode === parentNodeId) {
        //     this.findParent(parentNodeId).next(value);
        // } else {
        //     this.findParent(sourceNodeId).next(value);
        // }
    }

    getParent$(parentId: string): Observable<any> {
        return this.findParent(parentId).asObservable();
    }

    private findParent(id: string): BehaviorSubject<IFbpSocketEmitValue> {
        if (!this.parentSubjects[id]) {
            this.parentSubjects[id] = new BehaviorSubject<any>(null);
        }

        return this.parentSubjects[id];
    }

}
