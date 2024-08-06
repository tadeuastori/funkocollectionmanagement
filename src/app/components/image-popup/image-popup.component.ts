import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-popup',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './image-popup.component.html',
  styleUrl: './image-popup.component.less',
})
export class ImagePopupComponent implements OnInit {
  @Input() funkoName = '';
  @Input() imageName = new Observable<string>();

  imagePath: string = 'assets/images/';
  defaultImagePath: string = this.imagePath + 'funkos/default/';
  funkoImagePath: string = this.imagePath + 'funkos/';

  extensions: string[] = ['.jpg', '.png', '.jpeg'];

  displayImage: string = '';
  displayImageName: string = '';

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.imageName.pipe().subscribe((image: string) => {
      if (this.extensions.some((extension) => image.includes(extension))) {
        const folderPath = this.funkoImagePath + image;

        this._http.head(folderPath).subscribe(
          () => {
            this.displayImage = this.funkoImagePath + image;
            this.displayImageName = image;
          },
          () => {
            this.displayImage = this.defaultImagePath + 'model-box.jpeg';
            this.displayImageName = 'model-box.jpeg';
          }
        );
      } else {
        this.displayImage = this.defaultImagePath + 'model-box.jpeg';
        this.displayImageName = 'model-box.jpeg';
      }
    });
  }
}
