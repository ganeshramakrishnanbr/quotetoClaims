import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqliteService } from './services/sqlite.service';
import { MockDataService } from './services/mock-data.service';
import { ImageStorageService } from './services/image-storage.service';
import { AnimationService } from './services/animation.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SqliteService,
    MockDataService,
    ImageStorageService,
    AnimationService
  ]
})
export class CoreModule { }
