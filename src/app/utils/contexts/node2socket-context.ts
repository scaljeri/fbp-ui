import { IFbpNode } from '@scaljeri/fbp-core';
import { merge, Observable } from 'rxjs';
import { NodeManagerService } from 'src/app/services/node-manager.service';

export interface IFbpNodeSocketContext {
	mergeActivities: (activity$: Observable<boolean>) => Observable<boolean>;
}

export const node2SocketContext = (node: NodeManagerService, config: IFbpNode): IFbpNodeSocketContext => {
	return {
		mergeActivities: (activity$: Observable<boolean>): Observable<boolean> => {
			const parent = node.getSocketsManager(config.parentId || 'root');

			console.log('p=' + config.parentId, parent);
			if (parent) {
				const pActivity$ = parent.activity$;
				return merge(activity$, pActivity$);
			} else {
				return activity$;
			}
		}
	};
}
