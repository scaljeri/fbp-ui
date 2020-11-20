import { SocketPipe } from './socket.pipe';

describe('SocketPipe', () => {
  it('create an instance', () => {
    const pipe = new SocketPipe();
    expect(pipe).toBeTruthy();
  });
});
