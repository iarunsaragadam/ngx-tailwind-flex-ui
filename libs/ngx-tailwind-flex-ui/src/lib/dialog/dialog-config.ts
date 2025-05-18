import { DialogData } from './dialog.tokens';

export interface DialogConfig<D = DialogData> {
  data?: D;
  disableClose?: boolean;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
} 