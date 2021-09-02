import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsablesRoutingModule } from './responsables-routing.module';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsablesComponent } from './responsables.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


@NgModule({
    declarations: [ResponsablesComponent],
    imports: [
        CommonModule,
        ResponsablesRoutingModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers:[{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'legacy'}}]
})
export class ResponsablesModule { }
