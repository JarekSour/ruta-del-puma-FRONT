import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasNewRoutingModule } from './empresas-new-routing.module';
import { EmpresasNewComponent } from './empresas-new.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CurrencyFormatModule } from '../../pipes/amount.pipe.module';
import { DirectivesModule } from '../../directives/number.directive.module';


@NgModule({
    declarations: [
        EmpresasNewComponent
    ],
    imports: [
        CommonModule,
        EmpresasNewRoutingModule,
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule,
        CurrencyFormatModule,
        DirectivesModule
    ]
})
export class EmpresasNewModule { }
