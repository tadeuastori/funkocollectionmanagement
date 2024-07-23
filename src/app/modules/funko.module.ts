import { cloneDeep } from 'lodash';
import { IImage } from './image.module';

export interface IFunko {
  uniqueId?: string;
  type?: string;
  category?: any;
  collection?: string;
  number?: string;
  name?: string;
  serial?: string;
  comment?: any;
  pack?: number;
  size?: number;
  features?: string[];
  exclusive?: string[];
  stamps?: string[];
  image?: IImage[];
}

export class Funko implements IFunko {
  uniqueId: string;
  type: string;
  category: any;
  collection: string;
  number: string;
  name: string;
  serial: string;
  comment: any;
  pack: number;
  size: number;
  features: string[];
  exclusive: string[];
  stamps: string[];
  image: IImage[];

  constructor(clone?: Funko) {
    this.uniqueId = '';
    this.type = '';
    this.category = '';
    this.collection = '';
    this.number = '';
    this.name = '';
    this.serial = '';
    this.comment = '';
    this.pack = 0;
    this.size = 0;
    this.features = [];
    this.exclusive = [];
    this.stamps = [];
    this.image = [];

    if (clone) {
      this.uniqueId = cloneDeep(clone.uniqueId);
      this.type = cloneDeep(clone.type);
      this.category = cloneDeep(clone.category);
      this.collection = cloneDeep(clone.collection);
      this.number = cloneDeep(clone.number);
      this.name = cloneDeep(clone.name);
      this.serial = cloneDeep(clone.serial);
      this.comment = cloneDeep(clone.comment);
      this.pack = cloneDeep(clone.pack);
      this.size = cloneDeep(clone.size);
      this.features = cloneDeep(clone.features);
      this.exclusive = cloneDeep(clone.exclusive);
      this.stamps = cloneDeep(clone.stamps);
      this.image = cloneDeep(clone.image);
    }
  }
}
