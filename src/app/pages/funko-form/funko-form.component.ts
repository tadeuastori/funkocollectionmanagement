import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  BehaviorSubject,
  first,
  Observable,
  of,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { Funko, IFunko } from '../../modules/funko.module';
import { FunkoState } from '../../states/funko.state';
import {
  AddFunko,
  SetSelectedFunko,
  UnselectFunko,
  UpdateFunko,
} from '../../states/funko.actions';
import { Modal, Toast } from 'bootstrap';
import { ImagePopupComponent } from '../../components/image-popup/image-popup.component';
import { ShowMessageSuccess, ShowMessageWarning } from '../../states/message.action';
import { CanDeactivateType } from '../../guards/can-deactivate-form.guard';
import { PromptMessageComponent } from "../../shared/prompt-message/prompt-message.component";
import { PromptMessageService } from '../../services/prompt-message.service';

@Component({
  selector: 'app-funko-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ImagePopupComponent, PromptMessageComponent],
  templateUrl: './funko-form.component.html',
  styleUrl: './funko-form.component.less',
})
export class FunkoFormComponent extends BaseComponent implements OnInit {
  funkoList$: Observable<IFunko[]>;
  funkoSelected$: Observable<IFunko>;

  form: FormGroup = new FormGroup({});
  funkoSelected: IFunko = new Funko();
  item: string = '';
  loadedFunko: any;

  stampDatalist: string[] = [];
  exclusiveDatalist: string[] = [];
  featureDatalist: string[] = [];
  sizeDatalist: number[] = [];
  collectionDatalist: string[] = [];
  typeDatalist: string[] = [];
  serialDatalist: string[] = [];
  categoryDatalist: string[] = [];

  funkoName: string = '';
  imageName$ = new BehaviorSubject<string>('');

  constructor(private _router: Router, private _store: Store, private _promptMessage: PromptMessageService) {
    super();
    this.funkoList$ = _store.select(FunkoState.getFunkosList);
    this.funkoSelected$ = _store.select(FunkoState.getSelectedFunko);
  }

  ngOnInit(): void {
    this.funkoSelected$.pipe(first()).subscribe((funko) => {
      if (funko) {
        this.funkoSelected = funko;
        this._store.dispatch(new UnselectFunko());
      } else {
        this.funkoSelected = new Funko();
      }
    });

    this._initForm();

    this.funkoList$.pipe(takeUntil(this.destroy$)).subscribe((list) => {
      this._initDataList(list);
    });

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$), startWith(null))
      .subscribe((value) => {
        if (value?.name) {
          this.funkoName = value.name;
        }
      });
  }

  private _initForm() {
    const myGuid = uuidv4().replace(/-/g, '');

    this.form = new FormGroup({
      uniqueId: new FormControl(
        this.funkoSelected.uniqueId ? this.funkoSelected.uniqueId : myGuid,
        Validators.required
      ),
      type: new FormControl(
        this.funkoSelected.type ? this.funkoSelected.type : null,
        null
      ),
      category: new FormControl(
        this.funkoSelected.category ? this.funkoSelected.category : null,
        null
      ),
      collection: new FormControl(
        this.funkoSelected.collection ? this.funkoSelected.collection : null,
        Validators.required
      ),
      number: new FormControl(
        this.funkoSelected.number ? this.funkoSelected.number : null,
        null
      ),
      name: new FormControl(
        this.funkoSelected.name ? this.funkoSelected.name : null,
        Validators.required
      ),
      serial: new FormControl(
        this.funkoSelected.serial ? this.funkoSelected.serial : null,
        Validators.required
      ),
      comment: new FormControl(
        this.funkoSelected.comment ? this.funkoSelected.comment : null,
        null
      ),
      pack: new FormControl(
        this.funkoSelected.pack ? this.funkoSelected.pack : null,
        Validators.required
      ),
      size: new FormControl(
        this.funkoSelected.size ? this.funkoSelected.size : null,
        Validators.required
      ),
      features: new FormArray([]),
      exclusive: new FormArray([]),
      stamps: new FormArray([]),
      image: new FormArray([]),
    });

    if (this.funkoSelected.exclusive) {
      this.funkoSelected.exclusive.forEach((exclusive) => {
        this.addItemFormArray('exclusive', exclusive);
      });
    }

    if (this.funkoSelected.features) {
      this.funkoSelected.features.forEach((features) => {
        this.addItemFormArray('features', features);
      });
    }

    if (this.funkoSelected.stamps) {
      this.funkoSelected.stamps.forEach((stamps) => {
        this.addItemFormArray('stamps', stamps);
      });
    }

    if (this.funkoSelected.image) {
      this.funkoSelected.image.forEach((image) => {
        this.addImage(image.name);
      });
    }

    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private _initDataList(listFunko: IFunko[]) {
    listFunko.forEach((funko) => {
      if (funko['collection']) {
        if (!this.collectionDatalist?.includes(funko['collection'])) {
          this.collectionDatalist.push(funko['collection']);
        }
      }

      if (funko['type']) {
        if (!this.typeDatalist?.includes(funko['type'])) {
          this.typeDatalist.push(funko['type']);
        }
      }

      if (funko['serial']) {
        if (!this.serialDatalist?.includes(funko['serial'])) {
          this.serialDatalist.push(funko['serial']);
        }
      }

      if (funko['size']) {
        if (!this.sizeDatalist?.includes(funko['size'])) {
          this.sizeDatalist.push(funko['size']);
        }
      }

      if (funko['category']) {
        if (!this.categoryDatalist?.includes(funko['category'])) {
          this.categoryDatalist.push(funko['category']);
        }
      }

      if (funko['stamps']) {
        funko['stamps'].forEach((stamp) => {
          if (!this.stampDatalist?.includes(stamp)) {
            this.stampDatalist.push(stamp);
          }
        });
      }

      if (funko['exclusive']) {
        funko['exclusive'].forEach((stamp) => {
          if (!this.exclusiveDatalist?.includes(stamp)) {
            this.exclusiveDatalist.push(stamp);
          }
        });
      }

      if (funko['features']) {
        funko['features'].forEach((stamp) => {
          if (!this.featureDatalist?.includes(stamp)) {
            this.featureDatalist.push(stamp);
          }
        });
      }
    });

    this.collectionDatalist = this.collectionDatalist?.sort();
    this.stampDatalist = this.stampDatalist?.sort();
    this.exclusiveDatalist = this.exclusiveDatalist?.sort();
    this.featureDatalist = this.featureDatalist?.sort();
    this.typeDatalist = this.typeDatalist?.sort();
    this.serialDatalist = this.serialDatalist?.sort();
    this.sizeDatalist = this.sizeDatalist?.sort((a, b) => a - b);
    this.categoryDatalist = this.categoryDatalist.sort();
  }

  getFormArray(name: string) {
    return this.form.controls[name] as FormArray;
  }

  addItemFormArray(name: string, value: any = null) {
    const newItem = new FormControl(value ? value : null, null);
    this.getFormArray(name).push(newItem);
  }

  removeItemFormArray(name: string, imageIndex: number) {
    this.getFormArray(name).removeAt(imageIndex);
  }

  get formImages() {
    return this.form.controls['image'] as FormArray;
  }

  addImage(value: any = null) {
    let imageName = '';

    if (value) {
      imageName = value;
    } else if (this.form.value['collection'] && this.form.value['number']) {
      imageName =
        this.form.value['collection']
          .replace('..?', '')
          .replace(' - ', '-')
          .replace(/ /g, '-')
          .toLowerCase() +
        '-' +
        this.form.value['number'] +
        (this.formImages.length + 1 < 10 ? '-0' : '-') +
        (this.formImages.length + 1) +
        '.jpeg';
    }

    const imageForm = new FormGroup({
      name: new FormControl(imageName, Validators.required),
      base64: new FormControl(null, null),
      order: new FormControl(this.formImages.length + 1),
    });
    this.formImages.push(imageForm);
  }

  removeImage(imageIndex: number) {
    this.formImages.removeAt(imageIndex);
  }

  getControlValuebyIndex(index: number, Property: string) {
    return (this.form.controls['image'] as FormArray).controls[index].value[
      Property
    ];
  }

  voltarPagina() {
    this._router.navigate(['']);
  }

  saveFunko() {
    if (this.form.pristine || this.form.untouched) {
      this._store.dispatch(new SetSelectedFunko(this.form.value['uniqueId']));
      this._router.navigate(['/view-funko']);
      return;
    }

    let newFunko = new Funko();

    newFunko['uniqueId'] = this.form.value['uniqueId'];
    newFunko['collection'] = this.form.value['collection'];
    newFunko['number'] = this.form.value['number'];
    newFunko['name'] = this.form.value['name'];
    newFunko['type'] = this.form.value['type'];
    newFunko['serial'] = this.form.value['serial'];
    newFunko['size'] = this.form.value['size'];
    newFunko['category'] = this.form.value['category'];
    newFunko['stamps'] = this.form.value['stamps'];
    newFunko['exclusive'] = this.form.value['exclusive'];
    newFunko['features'] = this.form.value['features'];
    newFunko['image'] = this.form.value['image'];
    newFunko['comment'] = this.form.value['comment'];
    newFunko['pack'] = this.form.value['pack'];

    if (!this.funkoSelected.uniqueId) {
      this._store.dispatch(new AddFunko(newFunko));
      this.funkoSelected = new Funko();
      this._initForm();
      this._store.dispatch(new ShowMessageSuccess('Funko has been added!'));
    } else {
      this._store.dispatch(new UpdateFunko(newFunko));
      this._store.dispatch(new ShowMessageSuccess('Funko has been updated!'));
      this._router.navigate(['/view-funko']);
    }
  }

  displayImage(name: string): void {
    this.imageName$.next(name);

    const toastLiveExample = document.getElementById('imagePopup');
    const toastBootstrap = Modal.getOrCreateInstance(toastLiveExample!);

    toastBootstrap.show();
  }

  canDeactivate(): CanDeactivateType {

    if(this.form.pristine || this.form.untouched){
      return true;
    }


    return this._promptMessage.showPrompt('Unsaved Changes', 'There are unsaved changes. Do you want to leave?').then(result => {
      this._promptMessage.hidePrompt()
      this._store.dispatch(new ShowMessageWarning('Changes has been discarded!'));
      return result;
    });
  }
}
