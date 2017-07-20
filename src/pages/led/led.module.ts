import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Led } from './led';

@NgModule({
  declarations: [
    Led,
  ],
  exports: [
    Led
  ]
})
export class LedModule {}
