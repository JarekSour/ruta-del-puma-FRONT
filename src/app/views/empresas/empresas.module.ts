import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './empresas.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    declarations: [
        EmpresasComponent
    ],
    imports: [
        CommonModule,
        EmpresasRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule
    ]
})
export class EmpresasModule { }
