// import { dndPointerDown } from './dnd/down';
// import { dndPointerMove } from './dnd/move';
// import { IDragAndDropState, IFbpDndSubject, IFbpPointerHandlers } from './dnd/types';
// import { dndPointerUp } from './dnd/up';

// export function monitorElement(element: HTMLElement, handlers: IFbpPointerHandlers): IFbpDndSubject {
// 	let targetEl: HTMLElement;
// 	const state: IDragAndDropState[] = [];

// 	const pointerDownFn = dndPointerDown(element, handlers, state);
// 	const pointerMoveFn = dndPointerMove(handlers, state);
// 	const pointerUpFn = dndPointerUp(handlers, state);

// 	element.addEventListener('pointerdown', pointerDownFn);
// 	element.addEventListener('pointermove', pointerMoveFn);
// 	element.addEventListener('pointerup', pointerUpFn);
// 	element.addEventListener('pointerleave', pointerUpFn);

// 	return {
// 		unsubscribe: () => {
// 			element.removeEventListener('pointerdown', pointerDownFn);
// 			element.removeEventListener('pointermove', pointerMoveFn);
// 			element.removeEventListener('pointerup', pointerUpFn);
// 			element.removeEventListener('pointerleave', pointerUpFn);
// 		}
// 	};
// }

// export function startDragNode(event: PointerEvent, parent: HTMLElement): IDrag {
//   // tslint:disable-next-line no-string-literal
//   const nodeEl: HTMLElement = (event['path'].filter(node => node.nodeName === 'FBP-NODE') || [])[0];

//   if (nodeEl) {
//     return start(event, nodeEl, parent);
//   }
// }

// export function start(event: PointerEvent, child: HTMLElement, parent: HTMLElement, options: IDragOptions = {}): IDrag {
//   let state: IDragAndDrop = null;

//   const parentRect = parent.getBoundingClientRect();
//   const nodeRect = child.getBoundingClientRect();

//   state = {
//     parentRect,
//     nodeRect,
//     child,
//     startTime: Date.now(),
//     startX: event.clientX,
//     startY: event.clientY,
//     initStartX: child.style.left,
//     initStartY: child.style.top,
//     offsetX: event.clientX - nodeRect.x + parentRect.x,
//     offsetY: event.clientY - nodeRect.y + parentRect.y
//   };

//   return {
//     move: (e: PointerEvent): void => {
//       moveElement(state, e);
//     },
//     end: (e: PointerEvent): IDragResult => {
//       const result = { ...dragEnd(state, e), isClick: isClick(state, e), target: child } as IDragResult;

//       if (options.noResetIfClick !== true && result.isClick) {
//         reset(state);
//       }

//       return result;
//     }
//   };
// }

// function updateCoordinates(event: PointerEvent, state: IDragState,): void {
// 	const x = event.clientX;
// 	const y = event.clientY;

// 	const maxX = state.dragRect.width - state.targetRect.width;
// 	const maxY = state.dragRect.height - state.targetRect.height;
// 	state.x = Math.min(maxX, Math.max(0, x - state.offsetX));
// 	state.y = Math.min(maxY, Math.max(0, y - state.offsetY));
// }

// function moveElement(state: IDragState, target: HTMLElement): void {
// 	target.style.left = `${state.x}px`;
// 	target.style.top = `${state.y}px`;
// }

// function coordinateToPercentage(state: IDragState): IFbpPosition {
// 	// To percentage
// 	const left = (100 * state.x) / state.dragRect.width;
// 	const top = (100 * state.y) / state.dragRect.height;

// 	// state.child.style.left = `${left}%`;
// 	// state.child.style.top = `${top}%`;

// 	return { left, top };
// }

// function isClick(state: IDragAndDrop, event: PointerEvent): boolean {
// 	const duration = Date.now() - state.startTime;
// 	const distanceX = Math.abs(event.clientX - state.startX);
// 	const distanceY = Math.abs(event.clientY - state.startY);

// 	console.log(duration, distanceX, distanceY, (distanceX < 10 && distanceY < 10 && duration < 500));
// 	return distanceX < 10 && distanceY < 10 && duration < 500;
// }

// function reset(state: IDragAndDrop): void {
// 	state.child.style.left = state.initStartX;
// 	state.child.style.top = state.initStartY;
// }
