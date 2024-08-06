import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-prompt-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prompt-message.component.html',
  styleUrl: './prompt-message.component.less',
})
export class PromptMessageComponent {
  title: string = 'Modal Title';
  message: string = 'Modal Message';

  resolve!: (value: boolean) => void;

  isVisible: boolean = false;

  close() {
    this.isVisible = false;
    this.resolve(false);
  }

  confirm() {
    this.isVisible = false;
    this.resolve(true);
  }
}
