import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { FbpSocketPositions, IFbpSocket } from '@scaljeri/fbp-core';
import { InteractionService } from 'src/app/services/interaction.service';
import { FbpInteractionContexts } from 'src/app/constants/interaction';
import { IActiveElement } from 'src/app/types/interaction';
import { SocketsManager } from 'src/app/utils/classes/sockets-manager';
import { SocketService } from 'src/app/services/socket.service';

@Component({
    templateUrl: './sockets.component.html',
    styleUrls: ['./sockets.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocketsComponent implements OnInit, OnChanges {
    @Input() sockets!: IFbpSocket[] | undefined;
    @Input() nodeId!: string;
    @Input() position!: FbpSocketPositions;

    constructor(
        private service: SocketService,
        private cdr: ChangeDetectorRef,
        private interactionService: InteractionService) { }

    ngOnInit(): void {

    }

    ngOnChanges(): void {
        // Seems like a bug: https://github.com/angular/angular/issues/20611 ??
        // this.cdr.detectChanges();
    }

    @HostListener('pointerdown', ['$event'])
    onPointerDown(event: PointerEvent): void {
        console.log('Sockets: ....');
        const socket = (event.target as HTMLElement).closest('fbp-socket') as HTMLElement;
        // Check if it was a socket click
        this.interactionService.on({
            context: FbpInteractionContexts.socket,
            element: socket,
            longpress(event: PointerEvent, origin): void {
                console.log('sockets: lp');

                if (socket) {
                    console.log('Sockets: Edit s yes');

                }
            }
        });
    }
}
