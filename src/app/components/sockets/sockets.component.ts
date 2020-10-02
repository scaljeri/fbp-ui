import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { IFbpSocket } from '@scaljeri/fbp-core';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocketsComponent implements OnInit, OnChanges {
  @Input() sockets: IFbpSocket[];
  @Input() position: 'left' | 'right' | 'top' | 'bottomm';

  constructor(
    private cdr: ChangeDetectorRef,
    private interactionService: InteractionService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // Seems like a bug: https://github.com/angular/angular/issues/20611 ??
    this.cdr.detectChanges();
  }

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event): void {
	console.log('Sockets: ....');
	// Check if it was a socket click
  }
}
