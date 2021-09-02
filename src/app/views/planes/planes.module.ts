import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { PlanesComponent } from './planes.component';
import { PlanesRoutingModule } from './planes-routing.module';
import { MaterialModule } from '../../material.module';
import { CurrencyFormat } from '../../pipes/amount.pipe';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NumberDirective } from '../../directives/number.directive';

@NgModule({
    imports: [
        FormsModule,
        PlanesRoutingModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [PlanesComponent, CurrencyFormat, NumberDirective],
    providers:[{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'legacy'}}]
})
export class PlanesModule { }
