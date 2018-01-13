import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../config/environment'

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";


@Injectable()
export class ProjectService {
    private apiUrl = environment.ICO_API_URL + ":" + environment.ICO_API_PORT + "/api/";

    private httpOptions = {
        headers: new Headers()
    };

    constructor(private http: Http) {
        this.httpOptions.headers.append('Content-Type', 'application/json');
    }

    getProjects(): Observable<any> {
        return this.http.get(this.apiUrl + "projects", this.httpOptions)
            .map(res => res.json());
    }

    addProjects (model): Observable<any> {
        return this.http.post(this.apiUrl + "project/add", JSON.stringify(model), this.httpOptions)
            .map(res => res.json());
    }

    updateProject(id, model): Observable<any> {
        return this.http.put(this.apiUrl + "project/" + id, JSON.stringify(model), this.httpOptions)
            .map(res => res.json());
    }

    deleteProject(id): Observable<any> {
        return this.http.delete(this.apiUrl + "project/" + id, this.httpOptions)
            .map(res => res.json());
    }

}