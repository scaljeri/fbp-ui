import { ElementRef } from '@angular/core';

export interface IFbpInteractionModel {
	element: ElementRef,
	socketGhost: ElementRef,
}

// interface IFbpActiveComponent {
// 	element: IFbpInteractionModel
// }

export enum FbpElementNames {
	socket,
	node,
	connection
}

export interface IActiveElement {
	name: FbpElementNames
	element: HTMLElement
}

