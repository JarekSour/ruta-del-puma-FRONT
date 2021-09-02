import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { timeout } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(public http: HttpClient) { }

    post(uri, json) {
        return new Promise((resolve, reject) => {
            // let headers = new HttpHeaders({
            //     'x-access-token': localStorage.getItem('_gestiona') || '0'
            // });
            // let options = { headers: headers };

            this.http.post(environment.url_base + uri, json)
                .pipe(
                    timeout(10000)
                )
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

}
