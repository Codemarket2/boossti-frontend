export interface IHooksProps {
  onAlert: (arg1: string, arg2: string) => void;
}

export interface ISchema {
  _id: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMedia {
  url: string;
  caption: string;
}
