import { InjectionToken } from '@angular/core';
import { DialogConfig } from './dialog-config';

export interface DialogData<T = unknown> {
  [key: string]: T;
}

export const DIALOG_DATA = new InjectionToken<DialogData>('DIALOG_DATA');
export const DIALOG_DEFAULT_OPTIONS = new InjectionToken<DialogConfig>('DIALOG_DEFAULT_OPTIONS'); 