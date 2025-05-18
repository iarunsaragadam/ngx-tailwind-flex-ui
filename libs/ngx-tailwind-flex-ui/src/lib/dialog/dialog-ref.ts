import { Observable, Subject } from 'rxjs';
import { DialogConfig } from './dialog-config';

export class DialogRef<R = unknown> {
  private readonly afterClosedSubject = new Subject<R | undefined>();

  constructor(public readonly config: DialogConfig = {}) {}

  afterClosed(): Observable<R | undefined> {
    return this.afterClosedSubject.asObservable();
  }

  close(dialogResult?: R): void {
    this.afterClosedSubject.next(dialogResult);
    this.afterClosedSubject.complete();
  }
} 