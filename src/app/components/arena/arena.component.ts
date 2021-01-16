import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy, Input, OnChanges, HostListener, ElementRef, AfterViewInit, SimpleChanges, SimpleChange, ChangeDetectorRef, NgZone
} from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { NewState } from 'src/app/store/actions/state';
import { Store } from '@ngxs/store';
import { FBP_NODE_EVENTS } from 'src/app/events';
import { NodeManagerService } from 'src/app/services/node-manager.service';
import { fbpDispatchEvent } from 'src/app/utils/event';
import { IFbpState, createUID } from '@scaljeri/fbp-core';
import { NewInnerState } from 'src/app/store/actions/inner-state';
import { FbpInnerState } from 'src/app/store/inner-state';
import { ElementWrapperService } from 'src/app/shared/services/element-wrapper.service';

@Component({
    templateUrl: './arena.component.html',
    styleUrls: ['arena.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArenaComponent implements OnInit {
    // @Input() state!: IFbpState;
    setState(state: IFbpState): void {
        this.newState(state);
        this.updateInnerState();

        setTimeout(() => {
        this.wrapAllUnwrapped();
        }, 400);


    }

    wrapAllUnwrapped() {
        const nodes = this.element.nativeElement.shadowRoot.querySelector('slot').assignedElements();

        nodes.forEach((node: HTMLElement) => {
            if (node.tagName !== 'FBP-NODE') {
                this.wrapperService.wrapElement(this.element.nativeElement, node);

                // const parent = document.createElement('fbp-node');
                // this.element.nativeElement.appendChild(parent);
                // (parent as any).addContent(node);

                // parent.shadowRoot.appendChild(node)
                // debugger;
            }
        })

    }
    // private nodes: HTMLElement[];
    // private draggableNode: HTMLElement;

    // @Select(FfpState) animals$: Observable<IFbpState>;

    @Dispatch() newState = (state: IFbpState) => new NewState(state);
    @Dispatch() updateInnerState = () => new NewInnerState();

    constructor(
        private wrapperService: ElementWrapperService,
        private ngZone: NgZone,
        private element: ElementRef,
        private store: Store,
        private nodeService: NodeManagerService) {

        (element.nativeElement as any).setState = (state: IFbpState) => {
            this.setState(state);
        };
    }

    ngOnInit(): void {
        fbpDispatchEvent('fbp.ready', this.element, {
            detail: {
                init: (state: IFbpState) => {
                    this.setState(state);
                }
            }
        });

        // flowManager.initialize(this.element.nativeElement, this.store);

        // console.log(createUID());

        // setTimeout(() => {
        // 	const node = this.state.nodes[0];
        // 	console.log('UPDATE NODE ID=' + node.id);
        // 	const newNode = { ...node, position: { x: 1, y: 2 } };

        // 	this.newState(Object.assign({}, this.state, { nodes: [newNode, this.state.nodes[1]] }));
        // }, 5000);

        // this.ngZone.runOutsideAngular(() => {
        //     const { unsubscribe } = monitorElement(this.element.nativeElement, {
        //         pointerDown: (event: PointerEvent): unknown => {
        //             return { target: (event.target as HTMLElement).closest('fbp-node') as HTMLElement };
        //         }
        //     });
        //     // this.element.nativeElement.addEventListener('pointermove', (event) => {
        //     //   if (this.dragNode) {
        //     //     this.dragNode.move(event);
        //     //   }
        //     // });
        // });
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     // Update if state changes
    //     if (changes.state) {
    //         // console.log('YES YESY ', changes.state.previousValue, changes.state.currentValue, this.state);
    //         // this.store.reset(this.state);
    //     }

    //     // this.store.dispatch(new FbpStateActions.New(this.state));
    //     // this.store.reset(this.state);
    // }

    // ngAfterViewInit(): void {
    //     // setTimeout(() => {
    //     // console.log('number of node sis ' + this.nodes.length);
    //     // }, 2000);
    // }

    // get nodeTitle(): string {
    //     return 'Node title';
    // }

    // @HostListener('fbp-fullscreen', ['$event'])
    // fullscreen(nodeId: any): void {
    //     // do magic
    // }

    // @HostListener('window:resize')
    // onResize(): void {
    //     console.log('window.resize');
    // }

    // @HostListener(FBP_NODE_EVENTS.ADD, ['$event'])
    // onNodeAdd(event: any): void {
    //     // TODO: Is this one needed?
    //     console.log('--Node added with id=' + event.detail);
    // }

    // @HostListener(FBP_NODE_EVENTS.REMOVE, ['$event'])
    // onNodeRemove(event: any): void {
    //     // TODO: Cleanup connections
    //     console.log('Node removed with id=' + event.detail);
    // }



    // @HostListener('pointerdown', ['$event'])
    // onDragStart(event: PointerEvent): void {
    //   this.dragNode = dragUtils.startDragNode(event, this.element.nativeElement);
    //   // this.draggableNode = (event.target as HTMLElement).closest('fbp-node');
    //   // determine pointer offset with respect to the node
    //   // this.draggable = this.nodeService.lookupByHTMLElement(target.closest<HTMLElement>('fbp-node'));
    //   event.stopPropagation();
    // }

    // @HostListener('pointermove', ['$event'])
    // onDragMove(event: PointerEvent): void {
    //   // if (this.dragNode) {
    //   //   this.dragNode.move(event);
    //   // }
    // }

    // @HostListener('pointerup', ['$event'])
    // @HostListener('pointercancel', ['$event'])
    // // @HostListener('pointerout', ['$event'])
    // @HostListener('pointerleave', ['$event'])
    // onDragEnd(event: PointerEvent): void {
    //   if (this.dragNode) {
    //     const result = this.dragNode.end(event);

    //     if (!result.isClick) {
    //       // persist change in coordinates
    //       this.store.dispatch(new NodeCoordinates({
    //         id: result.target.getAttribute('id'),
    //         position: { left: result.left, top: result.top }
    //       }));
    //     }

    //     this.dragNode = null;
    //   }
    // }
}
