import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { IFbpSocket } from '@scaljeri/fbp-core';

@Component({
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocketsComponent implements OnInit, OnChanges {
  @Input() sockets: IFbpSocket[];
  @Input() position: 'left' | 'right' | 'top' | 'bottomm';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // Seems like a bug: https://github.com/angular/angular/issues/20611 ??
    this.cdr.detectChanges();
  }
}
