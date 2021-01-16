import { State, Action, StateContext, Selector, createSelector, Store } from '@ngxs/store';

import { Injectable } from '@angular/core';
import { IFbpInnerState } from '../types/inner-state';
import { FbpNodeId, FbpConnectionId, IFbpConnection, IFbpNode, IFbpState } from '@scaljeri/fbp-core';
import { ActivateNode, NewInnerState } from './actions/inner-state';
import { FbpState } from './state';

let x: any;
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
    constructor(private store: Store) {}

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


    // @Action(New)
    // newState(ctx: StateContext<FbpInnerState>, { payload }: { payload: FbpInnerState }) {
    //     console.log('State#newState', payload);
    //     ctx.setState(payload);
    // }

    @Action(NewInnerState)
    newState(ctx: StateContext<IFbpInnerState>) {
        const state: IFbpState = this.store.selectSnapshot(FbpState.get);

        console.log('set new state');

        ctx.setState({
            ...(state.nodes!.reduce((out, node) => {
                out.nodeIds.push(node.id!);
                out.nodes[node.id!] = node;
                return out;
            }, { nodeIds: [] as FbpNodeId[], nodes: {} as Record<FbpNodeId, IFbpNode>})),
            connections: (state.connections || []).reduce((out, conn) =>
                (out[conn.id!] = conn, out), {} as Record<FbpConnectionId, IFbpConnection>)
        });
    }

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
