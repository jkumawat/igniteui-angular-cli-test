import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {
  IgDatePickerComponent,
  IgCurrencyEditorComponent,
  IgDateEditorComponent,
  IgMaskEditorComponent,
  IgNumericEditorComponent,
  IgPercentEditorComponent,
  IgTextEditorComponent,
  IgComboComponent,
  IgGridComponent,
  IgHierarchicalGridComponent,
  IgPivotGridComponent,
  IgTreeGridComponent
} from 'igniteui-angular2';

const igniteuiComponents = [
  IgDatePickerComponent,
  IgCurrencyEditorComponent,
  IgDateEditorComponent,
  IgMaskEditorComponent,
  IgNumericEditorComponent,
  IgPercentEditorComponent,
  IgTextEditorComponent,
  IgComboComponent,
  IgGridComponent,
  IgHierarchicalGridComponent,
  IgPivotGridComponent,
  IgTreeGridComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...igniteuiComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
