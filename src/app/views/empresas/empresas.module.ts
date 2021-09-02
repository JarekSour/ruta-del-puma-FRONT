import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './empresas.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyFormat } from '../../pipes/amount.pipe';
import { NumberDirective } from '../../directives/number.directive';

@NgModule({
    declarations: [
        EmpresasComponent,
        CurrencyFormat,
        NumberDirective
    ],
    imports: [
        CommonModule,
        EmpresasRoutingModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class EmpresasModule { }
