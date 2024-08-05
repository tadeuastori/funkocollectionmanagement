import { Component, OnDestroy, OnInit } from '@angular/core';
import { StyleTypes } from '../../core/enums/style-types.enum';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MessageState } from '../../states/message.state';
import { Modal, Toast } from 'bootstrap';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.less',
})
export class ToastMessageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  messageState$: Observable<any>;
  messageStyleTypes = StyleTypes;

  displayMessage: string = '';
  displayType: StyleTypes = StyleTypes.LIGHT;

  constructor(_store: Store) {
    this.messageState$ = _store.select(MessageState.getMessage);
  }

  ngOnInit(): void {
    this.messageState$.pipe(takeUntil(this.destroy$)).subscribe((message) => {
      if (message.show) {
        this.displayMessage = message.message;
        this.displayType = message.type.toLowerCase();

        const toastLiveExample = document.getElementById('liveToast');
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample!);
        toastBootstrap.show();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
