import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { IPlan } from '../../interface/plan.interface';
import { HttpService } from '../../services/http/http.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

    displayedColumns: string[] = ['NAME', 'MEMBERSHIP', 'MONTHLY', 'LIMIT_IMAGE', 'LIMIT_CHAR', 'STATUS'];
    dataSource: MatTableDataSource<IPlan> = new MatTableDataSource();

    formResponsable: FormGroup;
    formPlan: FormGroup;
    formEmpresa: FormGroup

    constructor(
        public http: HttpService,
        private fb: FormBuilder,
        private _snackBar: SnackbarService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.formResponsable = this.fb.group({
            NAME: ['', Validators.required],
            EMAIL: ['', Validators.required]
        });

        this.formPlan = this.fb.group({
            ID_PLAN: ['', Validators.required]
        })

        this.formEmpresa = this.fb.group({
            NAME: ['', [Validators.required]],
            ADRESS: ['', [Validators.required]],
            TELEPHONE: ['', [Validators.required]],
            EMAIL: ['', [Validators.required]],
            DESCRIPTION: ['', [Validators.required]],
            LATLON: ['', [Validators.required]]
        })

        this.route.queryParams.subscribe(params => {
            let json = JSON.parse(atob(params['data']))
            this.formResponsable.controls['NAME'].setValue(json.NAME)
            this.formResponsable.controls['EMAIL'].setValue(json.EMAIL)

            this.http.post(environment.planes.getPlanes, {}).then((response: any) => {
                if (response.status) {
                    this.dataSource.data = response.data.filter(e => e.STATUS == true);
                    console.log(this.dataSource.data)
                }
            })
        });
    }

    onSubmit() {
        console.log(this.formEmpresa.controls.DESCRIPTION.value)
    }

}
