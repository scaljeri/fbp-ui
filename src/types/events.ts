import { IFbpState } from '@scaljeri/fbp-core';

export interface IFbpMainReady {
  init: (state: IFbpState) => void;
}
