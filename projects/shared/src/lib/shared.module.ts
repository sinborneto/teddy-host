import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './shared.service';

@NgModule({
  imports: [CommonModule],
  providers: [SharedService],
})
export class SharedModule {}
