import {
    Component,
    ElementRef,
    OnInit,
    AfterViewInit,
    OnChanges,
    Input,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    HostBinding,
    OnDestroy,
    ViewChild,
    Self,
    HostListener,
    SimpleChanges,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FbpNodeId, FbpSocketPositions, IFbpNode, IFbpSocket, IFbpState } from '@scaljeri/fbp-core';
import { FbpState } from 'src/app/store/state';
import { NodeManagerService } from 'src/app/services/node-manager.service';
import { Observable, Subscription } from 'rxjs';
import { fbpDispatchEvent } from 'src/app/utils/event';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { InteractionService } from 'src/app/services/interaction.service';
import { IFbpNodeChildConfig } from 'src/app/types/node';
import { FbpInnerState } from 'src/app/store/inner-state';
import { SocketsManager } from 'src/app/utils/classes/sockets-manager';
import { interaction2SocketContext } from 'src/app/utils/contexts/interaction2socket-context';
import { node2SocketContext } from 'src/app/utils/contexts/node2socket-context';
import { SocketService } from 'src/app/services/socket.service';
import { IFbpInnerState } from 'src/app/types/inner-state';
import { ActivateNode } from 'src/app/store/actions/inner-state';
import { filter, map } from 'rxjs/operators';

@Component({
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy, OnChanges {
    @ViewChild('content', { read: ElementRef }) content!: ElementRef;
    // @ViewChild('searchbox', { read: ElementRef }) searchEl: ElementRef;

    @Input() id = 'ROOT';
    @Select(FbpInnerState) state$!: Observable<IFbpInnerState>;

    public socketPositions = FbpSocketPositions;

    private configSub!: Subscription;

    @HostBinding('class.show') public config!: IFbpNode;

    // @HostBinding('class.fbp-full-size')
    // get fullSize(): boolean {
    //     return this.isRootNode || this.state.activeNodes[0].id === this.id;
    // }

    @HostBinding('class.fbp-socket-dnd') socketDnD = false;


    @Dispatch() activate = (id: FbpNodeId) => new ActivateNode(id);


    // protected dragNode: dragUtils.IDrag;
    // isActive = false;

    // public isFullSize = false;
    // public node$!: Observable<IFbpNode>;
    // public node!: IFbpNode;
    // public type: 'root' | null;
    // public id: string;

    // public connections: any; // ???????
    // public isRootNode = false;
    // public _socketService!: SocketsManager;

    // get socketsManager(): SocketsManager {
    //     if (!this._socketService) {
    //         this._socketService = new SocketsManager();
    //     }

    //     return this._socketService;
    // }

    @ViewChild('socketGost') socketGhost!: ElementRef;

    @HostBinding('class.is-fbp-flow')
    get isFlow(): boolean {
        return this.config && !this.config.type;
    }


    @HostBinding('style.top')
    get top(): string {
        // console.log('change detection ', this.node);
        return this.config?.ui?.position?.top + '%';
    }

    @HostBinding('style.left')
    get left(): string {
        return this.config && this.config?.ui?.position?.left + '%';
    }


    constructor(
        public element: ElementRef,
        private store: Store,
        private cdr: ChangeDetectorRef,
        private interactionService: InteractionService,
        private socketService: SocketService,
        private nodeService: NodeManagerService) {
        // @Self() public socketService: SocketService) {
        // this.node$ = this.store
        // 	.select(FfpState).pipe(
        // 		tap(d => console.log('tap', d)),
        // 		filter((node: IFbpNode) => node && node.id === this.idx));
        // this.state$ = this.store.select(FbpState);
        // this.type = element.nativeElement.getAttribute('type');

        console.log('bla');
        (element.nativeElement as any).addContent = this.addContent.bind(this);
    }

    addContent(el: HTMLElement): void {
        setTimeout(() => {
            console.log('XXXXXXXXXXXXXXXXXX', this.content);
            this.content.nativeElement.appendChild(el);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.id && !this.configSub) {
            this.configSub = this.store.select(FbpInnerState.getNode(this.id))
                .pipe(filter(config => !!config))
                .subscribe((config: IFbpNode) => {
                    this.config = config;
                    // setTimeout(() => {
                    //     this.cdr.detectChanges();
                    // }, 100);

                    // this.nodeConfig();

                    // this.nodeService.addNode(this.id, node.parentId, this.element.nativeElement, this, {
                    // 	socketService: this.socketService
                    // });
                });
        }
    }

    cls = '';


    ngOnInit(): void {

        // this.id = this.element.nativeElement.getAttribute('id');
        // debugger;

        // setTimeout(() => {
        // setTimeout(() => {
        this.cls = 'normal';
        this.cdr.detectChanges();
        // fbpDispatchEvent('fbp.ready', this.element, {
        //     detail: {
        //         init: (state: IFbpState) => this.setState(state)
        //     }
        // });

        // });
        // });
        // this.store.select(FbpState.getNode(this.id)).subscribe((node: IFbpNode) => {
        // this.store.select(FbpState.pandas(this.id)).subscribe((node: IFbpNode) => {
        //   console.log('-----NODE UPDATE', this.id, node);
        //   this.node = node;
        //   // this.cdr.markForCheck();
        // });

        // this.state$.subscribe(state => {
        // 	console.log('NodeComponent@state yesyes', state);
        // }ci)


        // setTimeout(() => {
        // 	const x = this.element.nativeElement.querySelector('[name=small]');
        // 	const slot = this.element.nativeElement.shadowRoot.querySelector('slot[name=small]').assignedElements()[0];

        // 	console.log('XXXXXXXXXXXX=', slot);
        // }, 1000);
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //   const id = changes.id;

    //   if (id.currentValue) {
    //     // fbpDispatchEvent(FBP_NODE_EVENTS.ADD, this.element, { detail: { id: this.id } });
    // this.nodeService.addNode(this.id, this.element.nativeElement, this);

    //     this.node$ = this.store.select(FbpState.getNode(this.id));
    //     this.cdr.detectChanges();
    //     this.node$.subscribe(node => {
    //       if (node) {
    //         console.log('xxxxNodeComponent@node$', node);
    //         this.node = node;
    //         this.cdr.detectChanges();
    //       }
    //     });

    //   }
    // }

    ngAfterViewInit(): void {
        console.log('YYYYYYYYY');
        // setTimeout(() => {
        // this.nodeService.initialize(this.target);
        // }, 1000);
        // this.socketsManager.setInteractionContext(interaction2SocketContext(this.interactionService));
        // setTimeout(() => {
        //   this.id = this.element.nativeElement.getAttribute('id');

        //   debugger;
        // }, 1000);
        // console.log('Node::::', this.element.nativeElement.children, this.element.nativeElement.children.item(0), child);
        // child.setSocket('yes from parent');
        // setTimeout(() => {
        // 	console.log('delayNODE id= ' + this.idx);
        // });
        // 	console.log('NODE id= ' + this.idx);
        // 	// this.node$ = this.store.select(FbpState); //.getNode(this.idx));
        // 	this.node$ = this.store.select(FbpState.getNode(this.idx));
        // 	// });
        // 	this.node$.subscribe(node => {
        // 		console.log('*********', node);
        // 		this.node = node;
        // 	});
    }

    ngOnDestroy(): void {
        // const event = fbpDispatchEvent(FBP_NODE_EVENTS.REMOVE, null, { detail: this.id });
        // this.element.nativeElement.parentNode.dispatchEvent(event);
        this.nodeService.removeNode(this.id);
    }

    // @HostListener('fbp.ready', ['$event'])
    // ready(event: CustomEvent): void {
    //     event.stopPropagation();
    // }

    // setState(state: IFbpState): void {
    //     // this.state = state;

    //     this.newState(state);
    //     this.node = { id: 'root'};
    //     // this.activate({ id: 'root' });

    //     // this.isRootNode = true;
    //     // setTimeout(() => {
    //     //     this.interactionService.activate({
    //     //         disconnect: () => { },
    //     //         element: this.element.nativeElement,
    //     //         socketGhost: this.socketGhost.nativeElement,
    //     //     });
    //     // }, 200);
    //     // this.nodes = this.element.nativeElement.shadowRoot.querySelector('slot').assignedElements();

    //     // This is the main node -> fullscreen always??
    //     // this.nodeService.addNode(null, null, this.element.nativeElement, this, {
    //     // 	socketService: this.socketService
    //     // });
    //     this.nodeConfig();
    // }

    onContentChange(event: any): void {
    }

    setParentConfig(parentConfig: IFbpNodeChildConfig): void {
        console.log(this.id + ' received parent config')
    }

    nodeConfig(): void {
        if (this.config) {
            // this.store.select(FbpInnerState.config(this.node.parentId)).subscribe((config: IFbpNodeChildConfig) => {
            // 	if (config) {
            // 		this.config = config;

            // 		console.log('received config', config);
            // 		// do more stuff here
            // 	}
            // });

            // this.store.select(FbpInnerState.config(this.node.parentId || 'root')).subscribe((config: IFbpChildNodeConfig) => {
            // 	if (config) {
            // 		this.socketsManager.setParentSocketsContext(node2SocketContext(this.nodeService, this.node));
            // 	}
            // });

            // this.socketsManager.setParentSocketsContext(node2SocketContext(this.nodeService, this.node));
        }

        // this.addNodeConfig({
        //     id: this.node?.id || 'root',
        //     socketService: {} as any // this.socketService
        // });
    }

    // setFullszie(state: boolean): void {
    //     this.isFullSize = state;
    //     this.socketsManager.activate(state);
    // }

    get sockets(): IFbpSocket[] | undefined {
        return this.config?.sockets;
    }

    get title(): string | undefined {
        return this.config?.title;
    }
}
