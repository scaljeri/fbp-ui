import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';

import { Injectable } from '@angular/core';
import { New } from './actions/state';
import { IFbpInnerState } from '../types/inner-state';
import { ActivateNode } from './actions/add-node-config';
import { FbpNodeId } from '@scaljeri/fbp-core';

@State<IFbpInnerState>({
    name: 'nodeConfig',
    defaults: {
        nodes: {},
        connections: {},
        nodeIds: []
    }
})
@Injectable()
export class FbpInnerState {
    @Selector()
    static getNode(id: FbpNodeId) {
        return createSelector([FbpInnerState], (state: IFbpInnerState) => {
            return state.nodes[id];
        });
    }
    // static config(id: string) {
    //     return createSelector([FbpInnerState], (state: IFbpInnerState) => {
    //         return state.nodeChildConfig[id];
    //     });
    // }

    // @Selector([FbpState])
    // static nodeChildConfigd(state: IFbpInnerState) {
    //     console.log('State#IFbpInnerState');
    //     return state.nodeChildConfig;
    // }

    // // @Selector([FbpState.nodes])
    // static nodexx(nodeId: string) {
    //     return createSelector([FbpInnerState], (state: IFbpInnerState) => {
    //         // const outNode = state.nodes.filter(node => node.id === nodeId)[0];
    //         // console.log('State#getNode#createSelector', nodeId, outNode, state);
    //         console.log('OKOKOKOKOKO', state.nodeChildConfig[nodeId]);
    //         return state.nodeChildConfig[nodeId]; // outNode;
    //     });
    // }

    // @Action(New)
    // newState(ctx: StateContext<FbpInnerState>, { payload }: { payload: FbpInnerState }) {
    //     console.log('State#newState', payload);
    //     ctx.setState(payload);
    // }

    @Action(ActivateNode)
    activateNode(ctx: StateContext<IFbpInnerState>, { payload }: { payload: FbpNodeId }) {
        // activeNodes
        let state = ctx.getState();

        // state = { ...state, activeNodes: [ payload, ...state.activeNodes] };
        // const node = { ...nodes[payload.id], ...{ position: payload.position } };
        // const node = state.nodes[payload.id]; // .find(n => n.id === payload.id);
        // configs[payload.id] = payload
        // ctx.patchState({ nodes: { ...nodes, [payload.id]: node } });
        // const index = state.nodes.indexOf(node);

        // const nodes = [...state.nodes];
        // nodes[index] = { ...node, ...{ position: payload.position } };

        // configs[payload.id] = payload;
        // const s = { ...state };
        // s[payload.id] = { ...s[payload.id], ...{ position: payload.position}};
        // ctx.patchState({ nodes });
        // state.nodes[index] = { ...node, ...{ position: payload.position } };
        // ctx.patchState({ nodeChildConfig: configs });
        ctx.setState(state);
        // ctx.setState(s);
    }

    // @Action(Decrement)
    //    decrement(ctx: StateContext<number>) {
    //    ctx.setState(ctx.getState() - 1);
    //  }
}
