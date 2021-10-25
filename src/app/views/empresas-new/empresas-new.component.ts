import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
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
    selector: 'app-empresas-new',
    templateUrl: './empresas-new.component.html',
    styleUrls: ['./empresas-new.component.scss']
})
export class EmpresasNewComponent implements OnInit {

    textLoader: string = 'Cargando datos...'
    displayedColumns: string[] = ['NAME', 'MEMBERSHIP', 'MONTHLY', 'LIMIT_IMAGE', 'LIMIT_CHAR', 'STATUS'];
    dataSource: MatTableDataSource<IPlan> = new MatTableDataSource();

    @ViewChild('stepper') stepper: MatStepper;
    formResponsable: FormGroup
    formPlan: FormGroup
    formEmpresa: FormGroup

    maxlengthDescription: number = 100
    maxImageToUpload: number = 0
    @ViewChild('inputAvatar') inputAvatar: ElementRef
    @ViewChild('inputFile') inputFile: ElementRef
    images: Array<{ base64: string, name: string, status: boolean | undefined }> = []
    imagesSuccess: number = 1
    albumHash: string = ''

    dvImageUploader: boolean = false
    dvStepper: boolean = true

    avatar: any = false

    @ViewChild('chipList') chipList: MatChipList;
    categoriasList: string[] = environment.categorias
    tags: string[] = [];
    separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
        public http: HttpService,
        private fb: FormBuilder,
        private _snackBar: SnackbarService,
        private route: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.spinner.show('loader')

        this.formResponsable = this.fb.group({
            NAME_RESPONSABLE: ['', Validators.required],
            EMAIL_RESPONSABLE: ['', Validators.required],
            ID_RESPONSABLE: ['']
        });

        this.formPlan = this.fb.group({
            ID_PLAN: ['', Validators.required]
        })

        this.formEmpresa = this.fb.group({
            NAME: ['', [Validators.required]],
            ADRESS: ['', [Validators.required]],
            TELEPHONE: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            EMAIL: ['', [Validators.required, emailValidator.valid]],
            DESCRIPTION: ['', [Validators.required]],
            LATLON: ['', [Validators.required]],
            METHOD: ['', [Validators.required]],
            CATEGORIA: ['', [Validators.required]],
            ETIQUETA: [[], [Validators.required]],
        })

        this.route.queryParams.subscribe(params => {
            if (params['data']) {
                try {
                    let json = JSON.parse(atob(params['data']))
                    console.log(json)
                    this.formResponsable.controls['ID_RESPONSABLE'].setValue(json.ID_RESPONSABLE)
                    this.formResponsable.controls['NAME_RESPONSABLE'].setValue(json.NAME)
                    this.formResponsable.controls['EMAIL_RESPONSABLE'].setValue(json.EMAIL)

                    this.http.post(environment.planes.getPlanes, {}).then((response: any) => {
                        if (response.status) {
                            this.dataSource.data = response.data.filter(e => e.STATUS == true);
                        }

                        this.spinner.hide('loader')
                    })
                } catch (e) {
                    this.router.navigate(['/responsables'])
                }
            } else {
                this.router.navigate(['/responsables'])
            }

        });

        this.onSuscribe()
    }

    onSubmit() {
        this.spinner.show('loader')
        this.textLoader = 'Creando empresa...'

        this.http.post(environment.empresa.addEmpresa, { ...this.formResponsable.value, ...this.formPlan.value, ...this.formEmpresa.value }).then((response: any) => {
            if (response.status) {
                this.albumHash = response.data
                this.dvImageUploader = true
                this.dvStepper = false
                this.spinner.hide('loader')
                this._snackBar.open('La empresa fue CREADA exitosamente');
            } else {
                this._snackBar.open('Hubo un problema al crear la empresa, reintenta nuevamente');
            }
        })
    }

    onSuscribe() {
        this.formPlan.controls.ID_PLAN.valueChanges.subscribe(idPlan => {
            let selectedPlan = this.dataSource.data.filter(plan => plan.ID_PLAN == idPlan)[0]
            this.formEmpresa.controls.DESCRIPTION.setValidators([Validators.required, Validators.maxLength(selectedPlan.LIMIT_CHAR)]);
            this.maxlengthDescription = selectedPlan.LIMIT_CHAR
            this.maxImageToUpload = selectedPlan.LIMIT_IMAGE
        })

        this.formEmpresa.controls.ETIQUETA.statusChanges.subscribe(
            status => this.chipList.errorState = status === 'INVALID'
        );
    }

    clickFileAvatar() {
        this.inputAvatar.nativeElement.value = ''
    }

    clickFile() {
        this.inputFile.nativeElement.value = ''
    }

    changeFileAvatar(event) {
        this.spinner.show('loader')
        let file = event.target.files[0];
        let reader: FileReader = new FileReader();

        reader.onloadend = (loadEvent: any) => {
            let base64 = reader.result.toString()
            this.http.post(environment.imagenes.uploadImage, { album: this.albumHash, image: base64.split(',')[1], avatar: true }).then((response: any) => {
                if (response.success) {
                    this.avatar = response.data.link
                    this._snackBar.open('La imagen fue agregada exitosamente');
                }
                this.spinner.hide('loader')
            }).catch(() => {
                this.spinner.hide('loader')
            })
        }
        reader.readAsDataURL(file)
    }

    changeFile(event) {
        this.spinner.show('loader')
        let file = event.target.files[0];
        let reader: FileReader = new FileReader();
        let obj = { base64: '', name: `${file.name}${this.images.length + 1}`, status: undefined }

        reader.onloadend = (loadEvent: any) => {
            obj.base64 = reader.result.toString()
            this.images.push(obj)
            this.http.post(environment.imagenes.uploadImage, { album: this.albumHash, image: obj.base64.split(',')[1], avatar: false }).then((response: any) => {
                if (response.success) {
                    this.imagesSuccess++
                    this.images.map(e => { if (e.name == obj.name) e.status = true })
                } else {
                    this.images.map(e => { if (e.name == obj.name) e.status = false })
                }
                this.spinner.hide('loader')
            })
        }
        reader.readAsDataURL(file)
    }

    addChipTag(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (value) {
            if(this.tags.filter(e => e == value).length == 0){
                this.tags.push(value);
                this.formEmpresa.controls.ETIQUETA.setValue(this.tags)
            }
        }

        event.input.value = '';
    }

    removeChipTag(chip: string): void {
        const index = this.tags.indexOf(chip);

        if (index >= 0) {
            this.tags.splice(index, 1);
            this.formEmpresa.controls.ETIQUETA.setValue(this.tags)
        }
    }

}
