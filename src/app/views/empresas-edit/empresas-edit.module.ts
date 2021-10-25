import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasEditRoutingModule } from './empresas-edit-routing.module';
import { EmpresasEditComponent } from './empresas-edit.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
    declarations: [
        EmpresasEditComponent
    ],
    imports: [
        CommonModule,
        EmpresasEditRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule
    ]
})
export class EmpresasEditModule { }
