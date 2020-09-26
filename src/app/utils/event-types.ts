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

export interface IFbpEventState {
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

export interface IFbpPointerEventHandlers {
	down?: (event: PointerEvent) => IFbpPointerDownTargets | void,
	up?: (event: PointerEvent, state: IFbpEventState) => void,
	click?: (event: PointerEvent, state: IFbpEventState) => void,
	doubleClick?: (event: PointerEvent, state: IFbpEventState) => void,
	move?: (event: PointerEvent, state: IFbpEventState) => void,
	longpress?: (event: PointerEvent, state: IFbpEventState) => void
}