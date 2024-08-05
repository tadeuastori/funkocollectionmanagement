import { Component, OnInit } from '@angular/core';
import { IFunko } from '../../modules/funko.module';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { FunkoState } from '../../states/funko.state';
import { BaseComponent } from '../base.component';
import {
  GenerateJson,
  LoadFunkoList,
  ResetState,
} from '../../states/funko.actions';
import { PromptMessageComponent } from '../../shared/prompt-message/prompt-message.component';
import { ShowMessageSuccess } from '../../states/message.action';
import { PromptMessageService } from '../../services/prompt-message.service';

@Component({
  selector: 'app-generate-json',
  standalone: true,
  imports: [PromptMessageComponent],
  templateUrl: './generate-json.component.html',
  styleUrl: './generate-json.component.less',
})
export class GenerateJsonComponent extends BaseComponent implements OnInit {
  funkoList$: Observable<IFunko[]>;
  json: string = '';

  listCount: number = 0;

  constructor(private _store: Store, private _promptMessage: PromptMessageService) {
    super();
    this.funkoList$ = this._store.select(FunkoState.getFunkosList);
  }
  ngOnInit(): void {
    this.funkoList$.pipe(takeUntil(this.destroy$)).subscribe((list) => {
      this.json = JSON.stringify(list, null, 2);

      this.listCount = list.length;
    });
  }

  public gerarJson() {
    this.copyToClipboard();
    this._store.dispatch(new GenerateJson());
    this._store.dispatch(new ShowMessageSuccess('Json copied to clipboard'));
  }

  public reloadJson(): void {
    this._store.dispatch(ResetState);
    this._store.dispatch(LoadFunkoList);
  }

  openPromptMessage(): void {
    this._promptMessage.showPrompt('Reload data from JSON file', 'Are you sure you want to reload data from JSON file?').then(result => {
      this._promptMessage.hidePrompt()
      if(result){
        this.reloadJson();
    this._store.dispatch(
      new ShowMessageSuccess('Data reloaded from JSON file')
    );
      }
    });
  }
}
