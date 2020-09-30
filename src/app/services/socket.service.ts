import { Injectable } from '@angular/core';

/*
Is provided at Node level.

Purpose: 
1) drag sockes => other socke areas need to go into droppable state
2) click sockes => highlight other sockets red/green
3) ...

TODO: A subflow-node has sockets which need to respond to both inside and outside
*/
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
}
