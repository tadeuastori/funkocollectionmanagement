import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public copyToClipboard(value?: string) {
    if (value) {
      navigator.clipboard.writeText(value);
    } else {
      const field = document.getElementById('jsonControl');
      navigator.clipboard.writeText(field?.textContent!);
    }
  }
}
