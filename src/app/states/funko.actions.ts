import { Funko, IFunko } from '../modules/funko.module';

export enum FunkoListStateActionsTypes {
  IsFunkoListReady = '[FunkoCollectionManagement] IsFunkoListReady',
  isFunkoListEdited = '[FunkoCollectionManagement] isFunkoListEdited',
  AddFunko = '[FunkoCollectionManagement] AddFunko',
  UpdateFunko = '[FunkoCollectionManagement] UpdateFunko',
  DeleteFunko = '[FunkoCollectionManagement] DeleteFunko',
  SetSelectedFunko = '[FunkoCollectionManagement] SetSelectedFunko',
  UnselectFunko = '[FunkoCollectionManagement] UnselectFunko',
  LoadFunkoList = '[FunkoCollectionManagement] LoadFunkoList',
  GenerateJson = '[FunkoCollectionManagement] GenerateJson',
  SetFilter = '[FunkoCollectionManagement] SetFilter',
  ResetState = '[FunkoCollectionManagement] ResetState',
}

export class IsFunkoListReady {
  public static readonly type = FunkoListStateActionsTypes.IsFunkoListReady;
  constructor(public payload: boolean) {}
}

export class IsFunkoListEdited {
  public static readonly type = FunkoListStateActionsTypes.isFunkoListEdited;
  constructor(public payload: boolean) {}
}

export class AddFunko {
  public static readonly type = FunkoListStateActionsTypes.AddFunko;
  constructor(public funko: Funko) {}
}

export class UpdateFunko {
  public static readonly type = FunkoListStateActionsTypes.UpdateFunko;
  constructor(public funko: Funko) {}
}

export class DeleteFunko {
  public static readonly type = FunkoListStateActionsTypes.DeleteFunko;
  constructor(public id: string) {}
}

export class SetSelectedFunko {
  public static readonly type = FunkoListStateActionsTypes.SetSelectedFunko;
  constructor(public id: string) {}
}

export class LoadFunkoList {
  public static readonly type = FunkoListStateActionsTypes.LoadFunkoList;
  constructor(public funkoList?: IFunko[]) {}
}

export class GenerateJson {
  public static readonly type = FunkoListStateActionsTypes.GenerateJson;
  constructor() {}
}

export class UnselectFunko {
  public static readonly type = FunkoListStateActionsTypes.UnselectFunko;
  constructor() {}
}

export class SetFilter {
  public static readonly type = FunkoListStateActionsTypes.SetFilter;
  constructor(public inlineFilter: string) {}
}

export class ResetState {
  public static readonly type = FunkoListStateActionsTypes.ResetState;
  constructor() {}
}
