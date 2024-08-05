export enum MessageStateActionsTypes {
  ShowMessageSuccess = '[MessageState] ShowMessageSuccess',
  ShowMessageError = '[MessageState] ShowMessageError',
  ShowMessageWarning = '[MessageState] ShowMessageWarning',
  ShowMessageInfo = '[MessageState] ShowMessageInfo',
  CleanMessage = '[MessageState] CleanMessage',
}

export class ShowMessageSuccess {
  public static readonly type = MessageStateActionsTypes.ShowMessageSuccess;
  constructor(public message: string) {}
}

export class ShowMessageError {
  public static readonly type = MessageStateActionsTypes.ShowMessageError;
  constructor(public message: string) {}
}

export class ShowMessageWarning {
  public static readonly type = MessageStateActionsTypes.ShowMessageWarning;
  constructor(public message: string) {}
}

export class CleanMessage {
  public static readonly type = MessageStateActionsTypes.CleanMessage;
  constructor() {}
}

export class ShowMessageInfo {
  public static readonly type = MessageStateActionsTypes.ShowMessageInfo;
  constructor(public message: string) {}
}
