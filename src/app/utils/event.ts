import { ElementRef } from '@angular/core';

export function fbpDispatchEvent(
	eventName: string,
	element?: ElementRef,
	proto: CustomEventInit<any> = {}): CustomEvent {

	const completeProto = Object.assign(
		{ bubbles: true, cancelable: true, view: window, detail: { /* ??? */ } }, proto);

	const event = new CustomEvent(eventName, completeProto);

	if (element) {
		element.nativeElement.dispatchEvent(event);
	}

	return event;
}



// export function listenerPointerEvents(element: HTMLElement, handlers: IPointerEventHandlers): void {

// }
