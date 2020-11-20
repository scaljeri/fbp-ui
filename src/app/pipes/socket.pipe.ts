import { Pipe, PipeTransform } from '@angular/core';
import { FbpSocketPositions, IFbpSocket } from '@scaljeri/fbp-core';

@Pipe({
    name: 'socket'
})
export class SocketPipe implements PipeTransform {

    transform(sockets: IFbpSocket[] | undefined, position: FbpSocketPositions): unknown {
        return (sockets || []).filter(socket => socket.side === position);
    }

}
