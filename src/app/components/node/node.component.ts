import { Component, ElementRef, OnInit, AfterViewInit, OnChanges, Input, ViewEncapsulation, ChangeDetectionStrategy, SimpleChange, SimpleChanges, ChangeDetectorRef, ContentChild, HostBinding, OnDestroy, Attribute, HostListener } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { IFbpNode } from '@scaljeri/fbp-core';
import { FbpState } from 'src/app/store/state'
import { NodeManagerService } from 'src/app/services/node-manager.service';
import * as dragUtils from '../../utils/drag-drop';
import { NodeCoordinates } from 'src/app/store/actions/node';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() id: string;

  protected dragNode: dragUtils.IDrag;
  protected isActive = false;

  public node$: Observable<IFbpNode>;
  public node: IFbpNode;
  // public id: string;

  public connections; // ???????

  @HostBinding('class.is-fbp-flow')
  get isFlow(): boolean {
    return this.node && !this.node.type;
  }


  @HostBinding('style.top')
  get top(): string {
    console.log('change detection ', this.node);
    return this.node && this.node.ui.position.top + '%';
  }

  @HostBinding('style.left')
  get left(): string {
    return this.node && this.node.ui.position.left + '%';
  }

  // state$;
  // @Select(FbpState) state$: Observable<FbpState>;

  constructor(
    protected element: ElementRef,
    protected store: Store,
    // protected cdr: ChangeDetectorRef,
    protected nodeService: NodeManagerService) {
    // this.node$ = this.store
    // 	.select(FfpState).pipe(
    // 		tap(d => console.log('tap', d)),
    // 		filter((node: IFbpNode) => node && node.id === this.idx));
    // this.state$ = this.store.select(FbpState);
  }

  ngOnChanges(o): void {
    if (this.id) {
      this.store.select(FbpState.node(this.id)).subscribe((node: IFbpNode) => {
        // this.node = prefillWithDefaults(node);
      });
    }
  }
  ngOnInit(): void {
    this.id = this.element.nativeElement.getAttribute('id');

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
  //     this.nodeService.addNode(this.id, this.element.nativeElement, this);

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
    const child = this.element.nativeElement.children[0];

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
    // this.nodeService.removeNode(this.id);
  }
}
