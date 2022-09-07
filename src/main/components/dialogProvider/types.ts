export enum DialogsNames {
  UpdateUserInfo
}

export type DialogState = {
  name: DialogsNames;
};

export type DialogsState = DialogState[];
