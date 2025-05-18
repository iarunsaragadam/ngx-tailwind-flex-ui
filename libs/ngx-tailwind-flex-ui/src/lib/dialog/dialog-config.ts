export interface DialogConfig<D = any> {
  /**
   * Data being injected into the child component.
   */
  data?: D;

  /**
   * Whether the dialog has a backdrop.
   */
  hasBackdrop?: boolean;

  /**
   * Whether the dialog can be closed by clicking on the backdrop.
   */
  disableClose?: boolean;

  /**
   * ID of the element that describes the dialog.
   */
  ariaDescribedBy?: string;

  /**
   * ID of the element that labels the dialog.
   */
  ariaLabelledBy?: string;

  /**
   * Width of the dialog.
   */
  width?: string;

  /**
   * Height of the dialog.
   */
  height?: string;

  /**
   * Custom CSS class for the dialog.
   */
  panelClass?: string | string[];

  /**
   * Custom CSS class for the overlay.
   */
  backdropClass?: string | string[];

  /**
   * Whether the dialog should focus the first focusable element on open.
   */
  autoFocus?: boolean | string;

  /**
   * Duration of the enter animation in milliseconds.
   */
  enterAnimationDuration?: number;

  /**
   * Duration of the exit animation in milliseconds.
   */
  exitAnimationDuration?: number;
} 