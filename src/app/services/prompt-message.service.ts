import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { PromptMessageComponent } from '../shared/prompt-message/prompt-message.component';

@Injectable({
  providedIn: 'root'
})
export class PromptMessageService {
  private _componentRef: ComponentRef<PromptMessageComponent> | null = null;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _appRef: ApplicationRef, private _injector: Injector ) { }

  showPrompt(title: string, message: string): Promise<boolean>{
    return new Promise((resolve) => {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(PromptMessageComponent);

      this._componentRef = componentFactory.create(this._injector);
      this._componentRef.instance.message = message
      this._componentRef.instance.title = title;
      this._componentRef.instance.resolve = resolve;
      this._componentRef.instance.isVisible = true;

      this._appRef.attachView(this._componentRef.hostView);

      const domElem = (this._componentRef.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    });
  }

  hidePrompt(): void {
    if(this._componentRef){
this._appRef.detachView(this._componentRef.hostView);
this._componentRef.destroy();
this._componentRef = null;
    }
  }
}
