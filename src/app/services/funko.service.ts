import { Injectable } from '@angular/core';
import { IFunko } from '../modules/funko.module';

@Injectable({
  providedIn: 'root',
})
export class FunkoService {
  constructor() {}

  public loadFunkoListFromFile(): IFunko[] {
    var funkoList = require('../data/data-base.json') as IFunko[];

    return funkoList;
  }

  public generateJsonFromFunkoList(funkoList: IFunko[]): string {
    return JSON.stringify(funkoList);
  }
}
