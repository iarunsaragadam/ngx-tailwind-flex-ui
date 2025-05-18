import { InjectionToken } from '@angular/core';
import { DialogConfig } from './dialog-config';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
export const DIALOG_DEFAULT_OPTIONS = new InjectionToken<DialogConfig>('DIALOG_DEFAULT_OPTIONS'); 