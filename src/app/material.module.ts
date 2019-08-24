import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
          MatButtonModule, 
          MatCheckboxModule,
          MatFormFieldModule,
          MatInputModule,
          MatIconModule,
          MatSelectModule,
          MatCardModule,
          MatDividerModule,
          MatToolbarModule,
          MatMenuModule,
          MatExpansionModule
  ],
  exports: [
          MatButtonModule,
          MatCheckboxModule,
          MatFormFieldModule,
          MatInputModule,
          MatIconModule,
          MatSelectModule,
          MatCardModule,
          MatDividerModule,
          MatToolbarModule,
          MatMenuModule,
          MatExpansionModule
  ],
})
export class MaterialModule { }