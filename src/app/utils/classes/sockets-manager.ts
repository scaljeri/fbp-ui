import { FbpSocketPositions } from '@scaljeri/fbp-core';
import { BehaviorSubject, merge, Observable, Subscription } from 'rxjs';
import { tap, mapTo, share } from 'rxjs/operators';
import { InteractionService } from '../../services/interaction.service';
import { IFbpInteractionSocketContext } from '../contexts/interaction2socket-context';
import { IFbpNodeSocketContext } from '../contexts/node2socket-context';

/*
Is provided at Node level.

Purpose: 
1) drag sockes => other socke areas need to go into droppable state
2) click sockes => highlight other sockets red/green
3) ...

TODO: A subflow-node has sockets which need to respond to both inside and outside
*/
export class SocketsManager {
	// private id!: string;
	// private dragSubject = new BehaviorSubject<boolean>(false);
	// private childDragStream$ = this.dragSubject.asObservable().pipe(share());
	// private dragStream$ = this.dragSubject.asObservable().pipe(share());
	// private active = false;

	private activeSubject = new BehaviorSubject<boolean>(false);
	public activity$ = this.activeSubject.asObservable();
	private interaction!: IFbpInteractionSocketContext; 
	private parent!: IFbpNodeSocketContext;

	private parentSocketActiveSub!: Subscription;

	setInteractionContext(context: IFbpInteractionSocketContext): void { 
		this.interaction = context;
	}

	setParentSocketsContext(context: IFbpNodeSocketContext): void {
		this.parent = context;
		this.activity$ = context.mergeActivities(this.activity$);
	}

	activate(state: boolean): void {
		// this.active = state;
	}

	onSocketPointerDown(socketId: string): void {
		// What can happen:
		// 1) dragging	--> move a socket
		// 2) click		--> start create a connection
		// 3) longpress --> configuration
	}

	onSocketsAreaPointerDown(socketSide: FbpSocketPositions): void {
		// What can happen
		// 1) longpress -> create socket
		// 2) ????
	}

	// dragStart(): void {
	// 	if (this.active) {
	// 		this.dragSubject.next(true);
	// 	} else {
	// 		this.parent.dragStart();
	// 	}
	// }

	// addParent(service: SocketsManager, id: string): void {
	// 	this.parent = service;
	// 	this.dragStream$ = merge(service.getDragEvents(), this.dragSubject).pipe(share());
	// }

	// getDragEvents(id?: string): Observable<boolean> {
	// 	return id === this.id ? this.dragStream$ : this.childDragStream$;
	// }

	destroy(): void {

	}
}
