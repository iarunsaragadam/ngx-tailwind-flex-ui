import { Observable, Subject } from 'rxjs';
import { DialogConfig } from './dialog-config';

export class DialogRef<R = any> {
  private readonly afterClosedSubject = new Subject<R | undefined>();

  constructor(public readonly config: DialogConfig = {}) {}

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<R | undefined> {
    return this.afterClosedSubject.asObservable();
  }

  /**
   * Closes the dialog.
   * @param dialogResult Optional result to return to the dialog opener.
   */
  close(dialogResult?: R): void {
    this.afterClosedSubject.next(dialogResult);
    this.afterClosedSubject.complete();
  }
} 