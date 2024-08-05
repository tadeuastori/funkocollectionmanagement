import { StyleTypes } from '../core/enums/style-types.enum';

export interface IMessageStateModel {
  message: string;
  show: boolean;
  type: StyleTypes;
}

export const defaultMessageStateModel = {
  message: '',
  show: false,
  type: StyleTypes.LIGHT,
} as IMessageStateModel;
