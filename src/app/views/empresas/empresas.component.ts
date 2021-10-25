import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { IPlan } from '../../interface/plan.interface';
import { HttpService } from '../../services/http/http.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { emailValidator } from '../../validators/email.validator';

@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

    displayedColumns: string[] = ['RESPONSABLE', 'NOMBRE', 'SUSCRIPCION', 'VER'];
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public http: HttpService,
        private fb: FormBuilder,
        private _snackBar: SnackbarService,
        private route: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.http.post(environment.empresa.getEmpresas, {}).then((response: any) => {
            if (response.status) {
                this.dataSource.data = response.data;
                console.log(response.data)
            }
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Empresas por página';
        this.paginator._intl.nextPageLabel = 'siguiente';
        this.paginator._intl.previousPageLabel = 'anterior';
    }

    getClassDate(date) {
        let d1 = new Date(date);
        let d2 = new Date();
        return d1.getTime() > d2.getTime() ? 'in-time' : 'out-time'
    }

    showEmpresa(row) {
        this.router.navigate(['/edit-empresa'], {
            queryParams: { data: btoa(JSON.stringify(row)) }
        })
    }



}
