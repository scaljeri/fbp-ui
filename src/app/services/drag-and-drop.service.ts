import { ElementRef, Injectable } from '@angular/core';

export interface PointerEventsHandler {
  updatePosition(x: number, y: number): void;
  pointerDown(event: PointerEvent): HTMLElement;
}

/* Pointer actions:
  * long press
  * click
  * double click
  * drag
*/

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  private nodes: { element: HTMLElement, handler: PointerEventsHandler }[] = [];
  private activeElement: HTMLElement;
  private activeHandler: PointerEventsHandler;
  private pointerDownFn;
  private pointerMoveFn;
  private pointerUpFn;

  constructor() { }

  setDragArea(element: HTMLElement, eventsHandler: PointerEventsHandler ): void {
    this.nodes.push({ element: this.activeElement, handler: this.activeHandler });
    this.activeElement.removeEventListener('pointerdown', this.pointerDownFn);
    this.activeElement.removeEventListener('pointermove', this.pointerMoveFn);
    this.activeElement.removeEventListener('pointerup', this.pointerUpFn);

    this.activeElement = element;
    this.activeHandler = eventsHandler;

    let target: HTMLElement;

    this.pointerDownFn = (event: PointerEvent) => {
      // TODO: provide target and x/y
      target = eventsHandler.pointerDown(event);
      // determine offsets

    };
    this.pointerMoveFn = (event: PointerEvent) => {};
    this.pointerUpFn = (event: PointerEvent) => {};
  }

  followPointer(element: any): void {

  }

}
