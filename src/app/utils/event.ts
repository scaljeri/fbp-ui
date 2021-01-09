import { ElementRef } from '@angular/core';

/* Usage:
    fbpDispatchEvent('fbp-ready', this.element, {
        detail: { // anything goes in here!
            init: (state: IFbpState) => {
                this.setState(state);
            }
        }
    });
*/
export function fbpDispatchEvent(
    eventName: string,
    element?: HTMLElement | ElementRef,
    proto: CustomEventInit<any> = {}): CustomEvent {
    const el = (element as ElementRef)?.nativeElement || element;

    const completeProto = Object.assign(
        { bubbles: true,
          cancelable: true,
          view: window,
          composed: true,
          target: el,
          detail: { /* ??? */ } }, proto);

    const event = new CustomEvent(eventName, completeProto);

    if (el) {
        el.dispatchEvent(event);
    }

    return event;
}



// export function listenerPointerEvents(element: HTMLElement, handlers: IPointerEventHandlers): void {

// }
