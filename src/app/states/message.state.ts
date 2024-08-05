import { Action, Selector, State, StateContext } from '@ngxs/store';
import { defaultMessageStateModel, IMessageStateModel } from './message.model';
import { AppStoreKeys } from '../../store/store-keys.module';
import {
  CleanMessage,
  ShowMessageError,
  ShowMessageInfo,
  ShowMessageSuccess,
  ShowMessageWarning,
} from './message.action';
import { StyleTypes } from '../core/enums/style-types.enum';
import { Injectable } from '@angular/core';

@State<IMessageStateModel>({
  name: AppStoreKeys.MessageState,
  defaults: defaultMessageStateModel,
})
@Injectable()
export class MessageState {
  constructor() {}

  @Selector()
  public static getMessage(state: IMessageStateModel): IMessageStateModel {
    return state;
  }

  @Action(ShowMessageError)
  showMessageError(
    ctx: StateContext<IMessageStateModel>,
    { message }: ShowMessageError
  ) {
    ctx.patchState({
      type: StyleTypes.DANGER,
      message: message,
      show: true,
    });

    ctx.dispatch(new CleanMessage());
  }

  @Action(ShowMessageSuccess)
  showMessageSuccess(
    ctx: StateContext<IMessageStateModel>,
    { message }: ShowMessageSuccess
  ) {
    ctx.patchState({
      type: StyleTypes.SUCCESS,
      message: message,
      show: true,
    });

    ctx.dispatch(new CleanMessage());
  }

  @Action(ShowMessageWarning)
  showMessageWarning(
    ctx: StateContext<IMessageStateModel>,
    { message }: ShowMessageWarning
  ) {
    ctx.patchState({
      type: StyleTypes.WARNING,
      message: message,
      show: true,
    });

    ctx.dispatch(new CleanMessage());
  }

  @Action(CleanMessage)
  cleanMessage(ctx: StateContext<IMessageStateModel>, action: CleanMessage) {
    ctx.patchState(defaultMessageStateModel);
  }

  @Action(ShowMessageInfo)
  showMessageInfo(
    ctx: StateContext<IMessageStateModel>,
    { message }: ShowMessageInfo
  ) {
    ctx.patchState({
      type: StyleTypes.PRIMARY,
      message: message,
      show: true,
    });

    ctx.dispatch(new CleanMessage());
  }
}
