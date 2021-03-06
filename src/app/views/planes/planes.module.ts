import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PlanesComponent } from './planes.component';
import { PlanesRoutingModule } from './planes-routing.module';
import { MaterialModule } from '../../material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CurrencyFormatModule } from '../../pipes/amount.pipe.module';
import { DirectivesModule } from '../../directives/number.directive.module';

@NgModule({
    declarations: [
        PlanesComponent
    ],
    imports: [
        FormsModule,
        PlanesRoutingModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CurrencyFormatModule,
        DirectivesModule
    ],
    providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'legacy' } }]
})
export class PlanesModule { }
