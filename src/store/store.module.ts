import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FunkoState } from '../app/states/funko.state';
import { environment } from '../environments/environment';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { AppStoreKeys } from './store-keys.module';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([FunkoState], {
      developmentMode: !environment.production,
    }),

    NgxsReduxDevtoolsPluginModule.forRoot({}),
    NgxsStoragePluginModule.forRoot({
      storage: StorageOption.SessionStorage,
      keys: [AppStoreKeys.FunkoState],
    }),
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
