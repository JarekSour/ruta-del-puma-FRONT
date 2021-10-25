import { Pipe } from '@angular/core';

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormat {
    transform(value: number,
        currencySign: string = '$ ',
        decimalLength: number = 0,
        chunkDelimiter: string = '.',
        decimalDelimiter: string = '.',
        chunkLength: number = 3): string {

        let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';

        if (value > 1000) {
            return `${currencySign}${value.toLocaleString().replace(',', decimalDelimiter).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter)}`
        } else {
            return currencySign + value
        }

    }
}
