import { Component, ElementRef, OnInit, AfterViewInit, OnChanges, Input, ViewEncapsulation, ChangeDetectionStrategy, SimpleChange, SimpleChanges, ChangeDetectorRef, ContentChild, HostBinding, OnDestroy, Attribute, HostListener } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { IFbpNode, IFbpState } from '@scaljeri/fbp-core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { FbpState } from 'src/app/store/state';
import { fbpDispatchEvent } from 'src/app/utils/event';
import { FBP_NODE_EVENTS } from 'src/app/events';
import { MainComponent } from '../main/main.component';
import { NodeManagerService } from 'src/app/services/node-manager.service';
import * as dragUtils from '../../utils/drag-drop';
import { NodeCoordinates } from 'src/app/store/actions/node';

@Component({
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeComponent implements OnInit, AfterViewInit, OnDestroy {
  protected dragNode: dragUtils.IDrag;
  protected isActive = false;

  public node$: Observable<IFbpNode>;
  public node: IFbpNode;
  public id: string;

  @HostBinding('style.top')
  get top(): string {
    return this.node.ui.position.top + '%';
  }

  @HostBinding('style.left')
  get left(): string {
    return this.node.ui.position.left + '%';
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

  ngOnInit(): void {
    this.id = this.element.nativeElement.getAttribute('id');

    this.store.select(FbpState.node(this.id)).subscribe((node: IFbpNode) => {
      console.log('update ' + this.id);
      this.node = node;
    });

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

  @HostListener('pointerdown', ['$event'])
  onDragStart(event: PointerEvent): void {
    if (this.isActive) {
      this.dragNode = dragUtils.startDragNode(event, this.element.nativeElement);
      // this.draggableNode = (event.target as HTMLElement).closest('fbp-node');
      // determine pointer offset with respect to the node
      // this.draggable = this.nodeService.lookupByHTMLElement(target.closest<HTMLElement>('fbp-node'));
      event.stopPropagation();
    }
  }

  @HostListener('pointermove', ['$event'])
  onDragMove(event: PointerEvent): void {
    if (this.dragNode) {
      this.dragNode.move(event);
    }
  }

  @HostListener('pointerup', ['$event'])
  @HostListener('pointercancel', ['$event'])
  // @HostListener('pointerout', ['$event'])
  @HostListener('pointerleave', ['$event'])
  onDragEnd(event: PointerEvent): void {
    if (this.dragNode) {
      const result = this.dragNode.end(event);

      if (!result.isClick) {
        // persist change in coordinates
        this.store.dispatch(new NodeCoordinates({
          id: result.target.getAttribute('id'),
          position: { left: result.left, top: result.top }
        }));
      }

      this.dragNode = null;
    }
  }
}
