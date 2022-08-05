import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable()
export class AppService {
    private baseUrl = environment.baseUrl;
    constructor(private http: HttpClient, private userService: UserService) {}

    signIn(body: any): Promise<any> {
        const url = `${this.baseUrl}/auth/login`;
        return this.http.post(url, body).toPromise();
    }

    getRecords(filter: any) {
        const url = `${this.baseUrl}/timesheet?limit=${filter.limit}&offset=${filter.offset}`;
        return this.http.get(url, {
            headers: {
                authorization: this.userService.getToken() || ''
            }
        });
    }

    getRecordStats(countries: string[]) {
        let url = `${this.baseUrl}/timesheet/stats`;
        if (countries.length) {
            url += `?countries=${countries.join(',')}`;
        }
        return this.http.get(url, {
            headers: {
                authorization: this.userService.getToken() || ''
            }
        });
    }

    getRecordStatsByDays(countries: string[]) {
        let url = `${this.baseUrl}/timesheet/stats/days`;
        if (countries.length) {
            url += `?countries=${countries.join(',')}`;
        }
        return this.http.get(url, {
            headers: {
                authorization: this.userService.getToken() || ''
            }
        });
    }

    getRecordSlotStatsByDays(countries: string[], day: number) {
        let url = `${this.baseUrl}/timesheet/stats/days-timeslot?day=${day}`;
        if (countries.length) {
            url += `&countries=${countries.join(',')}`;
        }
        return this.http.get(url, {
            headers: {
                authorization: this.userService.getToken() || ''
            }
        });
    }

    saveRecord(payload: any) {
        const url = `${this.baseUrl}/timesheet`;
        return this.http.post(url, payload, {
            headers: {
                authorization: this.userService.getToken() || ''
            }
        });
    }

    deleteRecord(id: number) {
        const url = `${this.baseUrl}/timesheet/${id}`;
        return this.http.delete(url, {
            headers: {
                authorization: this.userService.getToken() || ''
            }
        });
    }
}