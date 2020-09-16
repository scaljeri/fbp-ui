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


export interface IFbpDndSubject {
	unsubscribe(): void;
}

export interface IFbpPointerDownResponse {
	target?: HTMLElement | HTMLElement[];
	ghost?: HTMLElement;
}
export interface IDrag {
	move: (e: PointerEvent) => void;
	end: (e: PointerEvent) => IDragResult;
}

export interface IDragResult {
	isClick: boolean;
	left: number;
	top: number;
	target: HTMLElement;
}

export interface IDragOptions {
	noResetIfClick?: boolean;
}

export interface IDragAndDropState {
	target: HTMLElement;
	dragRect: DOMRect;
	targetRect: DOMRect;
	initStartX: string;
	initStartY: string;
	startX: number;
	startY: number;
	offsetX: number;
	offsetY: number;
	x?: number;
	y?: number;
	startTime: number;
}

export interface IFbpInteract {
	unsubscribe(): void;
}

export interface IFbpPointerHandlers {
	pointerMove?: (event: PointerEvent) => void;
	pointerDown?(event: PointerEvent): IFbpPointerDownResponse;
	pointerUp?(xy: IFbpPosition, event: PointerEvent, target?: HTMLElement): void;
}