import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IImage } from '../../modules/image.module';
import { CommonModule } from '@angular/common';
import { ImagePopupComponent } from '../image-popup/image-popup.component';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-image-slide',
  standalone: true,
  imports: [CommonModule, ImagePopupComponent],
  templateUrl: './image-slide.component.html',
  styleUrl: './image-slide.component.less',
})
export class ImageSlideComponent implements OnInit {
  @Input() imageList: IImage[] = [];
  @Input() funkoName: string = '';

  imageName$ = new BehaviorSubject<string>('');

  defaultList: string[] = ['model-box.jpeg', 'model-funko.jpeg'];

  imagePath: string = '/assets/images/';
  defaultImagePath: string = this.imagePath + 'funkos/default/';
  funkoImagePath: string = this.imagePath + 'funkos/';

  displayList: { name: string; path: string }[] = [];

  ngOnInit(): void {
    if (this.imageList.length == 0) {
      this.defaultList.forEach((item) => {
        this.displayList.push({
          name: item!,
          path: this.defaultImagePath + item!,
        });
      });
    } else {
      this.imageList.forEach((item) => {
        this.displayList.push({
          name: item.name!,
          path: this.funkoImagePath + item.name!,
        });
      });
    }
  }

  displayImage(name: string): void {
    this.imageName$.next(name);

    const toastLiveExample = document.getElementById('imagePopup');
    const toastBootstrap = Modal.getOrCreateInstance(toastLiveExample!);

    toastBootstrap.show();
  }
}
