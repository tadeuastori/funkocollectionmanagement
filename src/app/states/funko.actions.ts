import { Funko, IFunko } from '../modules/funko.module';

export enum FunkoListStateActionsTypes {
  IsFunkoListReady = '[FunkoCollectionManagement] IsFunkoListReady',
  isFunkoListEdited = '[FunkoCollectionManagement] isFunkoListEdited',
  GetFunkoList = '[FunkoCollectionManagement] GetFunkoList',
  AddFunko = '[FunkoCollectionManagement] AddFunko',
  UpdateFunko = '[FunkoCollectionManagement] UpdateFunko',
  DeleteFunko = '[FunkoCollectionManagement] DeleteFunko',
  GetFunko = '[FunkoCollectionManagement] GetFunko',
  UnselectFunko = '[FunkoCollectionManagement] UnselectFunko',
  LoadFunkoList = '[FunkoCollectionManagement] LoadFunkoList',
  GenerateJson = '[FunkoCollectionManagement] GenerateJson',
}

export class IsFunkoListReady {
  public static readonly type = FunkoListStateActionsTypes.IsFunkoListReady;
  constructor(public payload: boolean) {}
}

export class IsFunkoListEdited {
  public static readonly type = FunkoListStateActionsTypes.isFunkoListEdited;
  constructor(public payload: boolean) {}
}

export class GetFunkoList {
  public static readonly type = FunkoListStateActionsTypes.GetFunkoList;
  constructor() {}
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

export class GetFunko {
  public static readonly type = FunkoListStateActionsTypes.GetFunko;
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
