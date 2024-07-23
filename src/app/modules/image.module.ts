import { cloneDeep } from 'lodash';
export interface IImage {
  name?: string;
  base64?: any;
  order?: number;
}

export class Image implements IImage {
  name: string;
  base64: any;
  order: number;

  constructor(clone?: Image) {
    this.name = '';
    this.base64 = '';
    this.order = 0;

    if (clone) {
      this.name = cloneDeep(clone.name);
      this.base64 = cloneDeep(clone.base64);
      this.order = cloneDeep(clone.order);
    }
  }
}
