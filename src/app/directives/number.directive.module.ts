import { NgModule } from '@angular/core';
import { NumberDirective } from './number.directive';

@NgModule({
    imports: [],
    declarations: [
        NumberDirective
    ],
    exports: [
        NumberDirective
    ]
})
export class DirectivesModule { }
