import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { first, Observable, takeUntil } from 'rxjs';
import { Funko, IFunko } from '../../modules/funko.module';
import { Store } from '@ngxs/store';
import { FunkoState } from '../../states/funko.state';
import {
  DeleteFunko,
  SetSelectedFunko,
  UnselectFunko,
} from '../../states/funko.actions';
import { FunkoViewBadgeComponent } from '../../shared/funko-view-badge/funko-view-badge.component';
import { Router } from '@angular/router';
import { ImageSlideComponent } from '../../components/image-slide/image-slide.component';
import { ShowMessageError } from '../../states/message.action';
import { PromptMessageComponent } from '../../shared/prompt-message/prompt-message.component';
import { PromptMessageService } from '../../services/prompt-message.service';

@Component({
  selector: 'app-funko-view',
  standalone: true,
  imports: [
    FunkoViewBadgeComponent,
    ImageSlideComponent,
    PromptMessageComponent,
  ],
  templateUrl: './funko-view.component.html',
  styleUrl: './funko-view.component.less',
})
export class FunkoViewComponent extends BaseComponent implements OnInit {
  selectedFunko$: Observable<IFunko>;
  selectedFunko: IFunko = new Funko();
  hasSelectedFunko: boolean = false;

  constructor(private _store: Store, private _router: Router, private _promptMessage: PromptMessageService) {
    super();
    this.selectedFunko$ = _store.select(FunkoState.getSelectedFunko);
  }
  ngOnInit(): void {
    this.selectedFunko$.pipe(first()).subscribe((selected) => {
      if (selected.uniqueId) {
        this.selectedFunko = selected;
        this.hasSelectedFunko = true;
        this._store.dispatch(new UnselectFunko());
      } else {
        this.hasSelectedFunko = false;
      }
    });
  }

  private async _deleteFunko(): Promise<void> {
    this._store.dispatch(new DeleteFunko(this.selectedFunko.uniqueId!));
    this.hasSelectedFunko = false;
    this._store.dispatch(new ShowMessageError('Funko deleted'));
    this._router.navigate(['']);
  }

  public async editFunko(): Promise<void> {
    await this._store.dispatch(
      new SetSelectedFunko(this.selectedFunko.uniqueId!)
    );

    this._router.navigate(['/edit-funko']);
  }

  openPromptMessage(): void {
    this._promptMessage.showPrompt('Delete Funko', 'Are you sure you want to delete this Funko?').then(result => {
      this._promptMessage.hidePrompt()
      if(result){
        this._deleteFunko();
      }
    });
  }
}
