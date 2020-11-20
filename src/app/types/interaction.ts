import { ElementRef } from '@angular/core';
import { FbpInteractionContexts } from '../constants/interaction';
import { IFbpInteractionState } from '../utils/event-types';

export interface IFbpInteractionComponent {
    element: HTMLElement;
    socketGhost: HTMLElement;
    disconnect: () => void;
}

// interface IFbpActiveComponent {
// 	element: IFbpInteractionModel
// }
export interface IActiveElement {
    context: FbpInteractionContexts;
    element: HTMLElement;
    longpress: (event: PointerEvent, source: IActiveElement) => void;
}

export interface IFbpInteractionHandlers {
    up?: (state: IFbpInteractionState) => void;
}
