import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppService {
    private baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {}

    getRecords() {
        const url = `${this.baseUrl}/timesheet`;
        return this.http.get(url);
    }

    getRecordStats() {
        const url = `${this.baseUrl}/timesheet/stats`;
        return this.http.get(url);
    }

    saveRecord(payload: any) {
        const url = `${this.baseUrl}/timesheet`;
        return this.http.post(url, payload);
    }

    deleteRecord(id: number) {
        const url = `${this.baseUrl}/timesheet/${id}`;
        return this.http.delete(url);
    }
}