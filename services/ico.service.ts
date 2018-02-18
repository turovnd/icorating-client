import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../config/environment'

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";


@Injectable()
export class ICOService {
    private apiUrl = environment.ICO_API_URL + ":" + environment.ICO_API_PORT + "/api/";

    private httpOptions = {
        headers: new Headers()
    };

    constructor(private http: Http) {
        this.httpOptions.headers.append('Access-Control-Allow-Origin', '*');
        this.httpOptions.headers.append('Content-Type', 'application/json');
    }

    getICOs(): Observable<any> {
        return this.http.get(this.apiUrl + "icos", this.httpOptions)
            .map(res => res.json());
    }

    addICO(model): Observable<any> {
        return this.http.post(this.apiUrl + "ico/add", JSON.stringify(model), this.httpOptions)
            .map(res => res.json());
    }

    updateICO(id, model): Observable<any> {
        return this.http.put(this.apiUrl + "ico/" + id, JSON.stringify(model), this.httpOptions)
            .map(res => res.json());
    }

    deleteICO(id): Observable<any> {
        return this.http.delete(this.apiUrl + "ico/" + id, this.httpOptions)
            .map(res => res.json());
    }

}