import { NgModule } from '@angular/core';
import { CurrencyFormat } from './amount.pipe';

@NgModule({
    imports: [],
    declarations: [
        CurrencyFormat
    ],
    exports: [
        CurrencyFormat
    ]
})
export class CurrencyFormatModule { }

