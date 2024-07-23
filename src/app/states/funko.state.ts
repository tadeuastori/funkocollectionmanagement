import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { defaultFunkoStateModel, IFunkoStateModel } from './funko.model';
import { AppStoreKeys } from '../../store/store-keys.module';
import { Injectable } from '@angular/core';
import { first, lastValueFrom, Observable } from 'rxjs';
import { Funko, IFunko } from '../modules/funko.module';
import {
  AddFunko,
  GenerateJson,
  GetFunko,
  GetFunkoList,
  IsFunkoListEdited,
  IsFunkoListReady,
  LoadFunkoList,
  UnselectFunko,
} from './funko.actions';
import { FunkoService } from '../services/funko.service';
import { filter } from 'lodash';

@State<IFunkoStateModel>({
  name: AppStoreKeys.FunkoState,
  defaults: defaultFunkoStateModel,
})
@Injectable()
export class FunkoState {
  constructor(private _store: Store, private _funkoService: FunkoService) {}

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
  loadFunkoList(
    ctx: StateContext<IFunkoStateModel>,
    { funkoList }: LoadFunkoList
  ): void {
    ctx.patchState({ isFunkoListReady: false });

    if (funkoList) {
      ctx.patchState({ funkoList: funkoList });
      ctx.patchState({ isFunkoListReady: true });
    } else {
      var fromDB = this._funkoService.loadFunkoListFromFile() as IFunko[];

      ctx.patchState({ funkoList: fromDB });
    }

    ctx.patchState({ isFunkoListReady: true });
  }

  @Action(GetFunkoList)
  getFunkoList(
    ctx: StateContext<IFunkoStateModel>,
    action: GetFunkoList
  ): IFunko[] {
    return ctx.getState().funkoList;
  }

  @Action(AddFunko)
  async addFunko(
    ctx: StateContext<IFunkoStateModel>,
    { funko }: AddFunko
  ): Promise<void> {
    var funkoList = (await lastValueFrom(
      this._store.select(FunkoState.getFunkosList).pipe(first())
    )) as IFunko[];

    funkoList.push(funko);

    ctx.dispatch(new LoadFunkoList(funkoList));
  }

  @Action(GenerateJson)
  generateJson(
    ctx: StateContext<IFunkoStateModel>,
    action: GenerateJson
  ): string {
    return this._funkoService.generateJsonFromFunkoList(
      ctx.getState().funkoList
    );
  }

  @Action(GetFunko)
  async getFunko(
    ctx: StateContext<IFunkoStateModel>,
    { id }: GetFunko
  ): Promise<IFunko> {
    var funkoList = (await lastValueFrom(
      this._store.select(FunkoState.getFunkosList).pipe(first())
    )) as IFunko[];

    funkoList.map((funko) => {
      if (funko.uniqueId === id) {
        ctx.patchState({ selectedFunko: funko });
      }
    });

    return ctx.getState().selectedFunko;
  }

  @Action(UnselectFunko)
  unselectFunko(
    ctx: StateContext<IFunkoStateModel>,
    action: UnselectFunko
  ): void {
    ctx.patchState({ selectedFunko: new Funko() as IFunko });
  }
}
