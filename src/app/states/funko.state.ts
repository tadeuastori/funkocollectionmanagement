import { Action, Selector, State, StateContext } from '@ngxs/store';
import { defaultFunkoStateModel, IFunkoStateModel } from './funko.model';
import { AppStoreKeys } from '../../store/store-keys.module';
import { Injectable } from '@angular/core';
import { Funko, IFunko } from '../modules/funko.module';
import {
  AddFunko,
  GenerateJson,
  SetSelectedFunko,
  IsFunkoListEdited,
  IsFunkoListReady,
  LoadFunkoList,
  ResetState,
  SetFilter,
  UnselectFunko,
  DeleteFunko,
  UpdateFunko,
} from './funko.actions';
import { FunkoService } from '../services/funko.service';

@State<IFunkoStateModel>({
  name: AppStoreKeys.FunkoState,
  defaults: defaultFunkoStateModel,
})
@Injectable()
export class FunkoState {
  constructor(private _funkoService: FunkoService) {}

  @Selector()
  public static getFunkosList(state: IFunkoStateModel): IFunko[] {
    return state.funkoList;
  }

  @Selector()
  public static getSelectedFunko(state: IFunkoStateModel): IFunko {
    return state.selectedFunko;
  }

  @Selector()
  public static getFilter(state: IFunkoStateModel): string {
    return state.filter;
  }

  @Selector()
  public static getIsFunkoListReady(state: IFunkoStateModel): boolean {
    return state.isFunkoListReady;
  }

  @Selector()
  public static getIsFunkoListEdited(state: IFunkoStateModel): boolean {
    return state.isFunkoListEdited;
  }

  @Action(IsFunkoListReady)
  setIsFunkoListReady(
    ctx: StateContext<IFunkoStateModel>,
    action: IsFunkoListReady
  ): void {
    ctx.patchState({ isFunkoListReady: action.payload });
  }

  @Action(IsFunkoListEdited)
  setIsFunkoListEdited(
    ctx: StateContext<IFunkoStateModel>,
    action: IsFunkoListEdited
  ): void {
    ctx.patchState({ isFunkoListEdited: action.payload });
  }

  @Action(LoadFunkoList)
  async loadFunkoList(
    ctx: StateContext<IFunkoStateModel>,
    { funkoList }: LoadFunkoList
  ): Promise<void> {
    ctx.patchState({ isFunkoListReady: false });

    if (funkoList) {
      ctx.patchState({ funkoList: funkoList });
    } else {
      const funkoFromState = ctx.getState().funkoList as IFunko[];
      const isEditabled = ctx.getState().isFunkoListEdited;

      if (funkoFromState.length > 0 && isEditabled) {
        ctx.patchState({ funkoList: funkoFromState });
      } else {
        var fromDB = this._funkoService.loadFunkoListFromFile() as IFunko[];
        ctx.patchState({ funkoList: fromDB });
        ctx.patchState({ lastTimestampLoaded: new Date() });
      }
    }

    ctx.patchState({ isFunkoListReady: true });
  }

  @Action(AddFunko)
  async addFunko(
    ctx: StateContext<IFunkoStateModel>,
    { funko }: AddFunko
  ): Promise<void> {
    var funkoList = [...ctx.getState().funkoList];

    funkoList.push(funko);

    ctx.dispatch(new LoadFunkoList(funkoList));
    ctx.dispatch(new IsFunkoListEdited(true));
  }

  @Action(SetSelectedFunko)
  async setSelectedFunko(
    ctx: StateContext<IFunkoStateModel>,
    { id }: SetSelectedFunko
  ): Promise<IFunko> {
    var funkoList = ctx.getState().funkoList;

    funkoList.map((funko) => {
      if (funko.uniqueId === id) {
        ctx.patchState({ selectedFunko: funko });
      }
    });

    return ctx.getState().selectedFunko;
  }

  @Action(UnselectFunko)
  async unselectFunko(
    ctx: StateContext<IFunkoStateModel>,
    action: UnselectFunko
  ): Promise<void> {
    ctx.patchState({ selectedFunko: new Funko() as IFunko });
  }

  @Action(SetFilter)
  async setFilter(
    ctx: StateContext<IFunkoStateModel>,
    { inlineFilter }: SetFilter
  ): Promise<void> {
    ctx.patchState({ filter: inlineFilter });
  }

  @Action(ResetState)
  async resetState(ctx: StateContext<IFunkoStateModel>): Promise<void> {
    ctx.setState(defaultFunkoStateModel);
  }

  @Action(GenerateJson)
  async generateJson(
    ctx: StateContext<IFunkoStateModel>,
    action: GenerateJson
  ): Promise<void> {
    ctx.dispatch(new IsFunkoListEdited(false));
  }

  @Action(DeleteFunko)
  async deleteFunko(
    ctx: StateContext<IFunkoStateModel>,
    action: DeleteFunko
  ): Promise<void> {
    var funkoList = [...ctx.getState().funkoList];

    let index = funkoList.findIndex((funko) => funko.uniqueId === action.id);
    funkoList.splice(index, 1);

    ctx.dispatch(new UnselectFunko());
    ctx.dispatch(new LoadFunkoList(funkoList));
    ctx.dispatch(new IsFunkoListEdited(true));
  }

  @Action(UpdateFunko)
  async updateFunko(
    ctx: StateContext<IFunkoStateModel>,
    action: UpdateFunko
  ): Promise<void> {
    var funkoList = [...ctx.getState().funkoList];

    let index = funkoList.findIndex(
      (funko) => funko.uniqueId === action.funko.uniqueId
    );
    funkoList.splice(index, 1);

    funkoList.push(action.funko);

    ctx.dispatch(new LoadFunkoList(funkoList));
    ctx.dispatch(new IsFunkoListEdited(true));
    ctx.dispatch(new SetSelectedFunko(action.funko.uniqueId));
  }
}
