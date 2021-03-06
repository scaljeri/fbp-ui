import { IFbpPosition } from '@scaljeri/fbp-core';

// interface IDragState {
// 	target: HTMLElement;
// 	dragRect: DOMRect;
// 	targetRect: DOMRect;
// 	initStartX: string;
// 	initStartY: string;
// 	startX: number;
// 	startY: number;
// 	offsetX: number;
// 	offsetY: number;
// 	x?: number;
// 	y?: number;
// 	startTime: number;
// }


// export interface IFbpDndSubject {
// 	unsubscribe(): void;
// }

// export interface IDrag {
// 	move: (e: PointerEvent) => void;
// 	end: (e: PointerEvent) => IDragResult;
// }

// export interface IDragResult {
// 	isClick: boolean;
// 	left: number;
// 	top: number;
// 	target: HTMLElement;
// }

// export interface IDragOptions {
// 	noResetIfClick?: boolean;
// }

export interface IFbpInteractionState {
	parentRect: DOMRect;
	startTime: number;
	startX: number;
	startY: number;

	target?: HTMLElement;
	targetRect?: DOMRect;
	initStartX?: string;
	initStartY?: string;
	offsetX?: number;
	offsetY?: number;
	x?: number;
	y?: number;
}

export interface IFbpEventConnect {
	disconnect(): void;
}

export interface IFbpPointerDownTargets {
	target?: HTMLElement;
	targets?: HTMLElement[];
	ghost?: HTMLElement; // Only allowed in combination with 'target'
}

export type IFbpGetContext = (event: PointerEvent) => IFbpInteractionContext;

export interface IFbpInteractionContext {
	targets?: HTMLElement[],
	down?: (event: PointerEvent) => IFbpPointerDownTargets | void,
	up?: (event: PointerEvent, state: IFbpInteractionState) => void,
	click?: (event: PointerEvent, state: IFbpInteractionState) => void,
	doubleClick?: (event: PointerEvent, state: IFbpInteractionState) => void,
	move?: (event: PointerEvent, state: IFbpInteractionState) => void,
	longpress?: (event: PointerEvent, state: IFbpInteractionState) => void
}