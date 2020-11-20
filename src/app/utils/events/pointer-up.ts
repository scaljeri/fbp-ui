import { IFbpEventContext, IFbpInteractionState } from '../event-types';

const pointerUp = (event: PointerEvent, context: IFbpEventContext, states: IFbpInteractionState[]): void => {
	event.stopPropagation();

	if (context.up) {
		states.forEach(state => {
			context.up!(event, state);
		});
	}
}

export { pointerUp };