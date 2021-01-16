import { IFbpState } from '@scaljeri/fbp-core';
export class NewState {
  static readonly type = '[State] New';
  constructor(public payload: IFbpState) { }
}
