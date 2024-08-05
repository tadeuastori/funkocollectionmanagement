import { Funko, IFunko } from '../modules/funko.module';

export interface IFunkoStateModel {
  isFunkoListReady: boolean;
  isFunkoListEdited: boolean;
  funkoList: IFunko[];
  selectedFunko: IFunko;
  filter: string;
  lastTimestampLoaded: Date;
}

export const defaultFunkoStateModel = {
  isFunkoListReady: false,
  isFunkoListEdited: false,
  funkoList: [new Funko()] as IFunko[],
  selectedFunko: new Funko() as IFunko,
  filter: '',
  lastTimestampLoaded: new Date(),
} as IFunkoStateModel;
