import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'timesheet-track';
  times = [
    '1-2',
    '2-3',
    '3-4',
    '5-6',
    '6-7',
    '7-8',
    '8-9',
    '9-10',
    '10-11',
    '11-12',
    '12-13',
    '13-14',
    '14-15',
    '15-16',
    '16-17',
    '17-18',
    '18-19',
    '19-20',
    '20-21',
    '21-22',
    '22-23',
    '23-24',
    '24-1'
  ];
  timezones = [
    {
      "id": -12,
      "value": "(UTC-12:00) Etc/GMT+12"
    },
    {
      "id": -11,
      "value": "(UTC-11:00) Etc/GMT+11"
    },
    {
      "id": -10,
      "value": "(UTC-10:00) Pacific/Honolulu"
    },
    {
      "id": -9,
      "value": "(UTC-09:00) America/Anchorage"
    },
    {
      "id": -8,
      "value": "(UTC-08:00) America/Los_Angeles"
    },
    {
      "id": -7,
      "value": "(UTC-07:00) America/Phoenix"
    },
    {
      "id": -6,
      "value": "(UTC-06:00) America/Guatemala"
    },
    {
      "id": -5,
      "value": "(UTC-05:00) America/New_York"
    },
    {
      "id": -4.5,
      "value": "(UTC-04:30) America/Caracas"
    },
    {
      "id": -4,
      "value": "(UTC-04:00) America/Halifax"
    },
    {
      "id": -3.5,
      "value": "(UTC-03:30) America/St_Johns"
    },
    {
      "id": -3,
      "value": "(UTC-03:00) America/Sao_Paulo"
    },
    {
      "id": -2,
      "value": "(UTC-02:00) Etc/GMT+2"
    },
    {
      "id": -1,
      "value": "(UTC-01:00) Atlantic/Cape_Verde"
    },
    {
      "id": 0,
      "value": "(UTC+00:00) Coordinated Universal Time"
    },
    {
      "id": 1,
      "value": "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna, Paris"
    },
    {
      "id": 2,
      "value": "(UTC+02:00) Europe/Istanbul"
    },
    {
      "id": 3,
      "value": "(UTC+03:00) Baghdad, Kuwait, Riyadh"
    },
    {
      "id": 3.5,
      "value": "(UTC+03:30) Asia/Tehran"
    },
    {
      "id": 4,
      "value": "(UTC+04:00) Europe/Moscow, Abu Dhabi, Muscat"
    },
    {
      "id": 4.5,
      "value": "(UTC+04:30) Asia/Kabul"
    },
    {
      "id": 5,
      "value": "(UTC+05:00) Asia/Tashkent, Asia/Karachi"
    },
    {
      "id": 5.5,
      "value": "(UTC+05:30) Asia/Colombo"
    },
    {
      "id": 5.7,
      "value": "(UTC+05:45) Asia/Kathmandu"
    },
    {
      "id": 6,
      "value": "(UTC+06:00) Asia/Almaty, Asia/Dhaka"
    },
    {
      "id": 6.5,
      "value": "(UTC+06:30) Asia/Yangon"
    },
    {
      "id": 7,
      "value": "(UTC+07:00) Asia/Bangkok"
    },
    {
      "id": 8,
      "value": "(UTC+08:00) Australia/Perth, Asia/Shanghai, Asia/Singapore"
    },
    {
      "id": 9,
      "value": "(UTC+09:00) Asia/Irkutsk, Asia/Tokyo"
    },
    {
      "id": 9.5,
      "value": "(UTC+09:30) Australia/Darwin"
    },
    {
      "id": 10,
      "value": "(UTC+10:00) Australia/Brisbane, Australia/Sydney"
    },
    {
      "id": 11,
      "value": "(UTC+11:00) Asia/Vladivostok"
    },
    {
      "id": 12,
      "value": "(UTC+12:00) Coordinated Universal Time+12"
    },
    {
      "id": 13,
      "value": "(UTC+13:00) Pacific/Tongatapu"
    },
  ]
  timesheetForm: FormGroup;

  constructor() {
    this.timesheetForm = this.initializeForm();
    this.timesheetForm.controls['clientTime'].disable({ onlySelf: true });
    this.timesheetForm.controls['agencyTime'].disable({ onlySelf: true });
  }

  ngOnInit(): void {
  }

  initializeForm() {
    return new FormGroup({
      developerTime: new FormControl(''),
      developerTimezone: new FormControl(''),
      clientTime: new FormControl(''),
      clientTimezone: new FormControl(''),
      agencyTime: new FormControl(''),
      agencyTimezone: new FormControl(''),
    });
  }

  selectTimezone() {
    const developerTime = this.timesheetForm.controls['developerTime'].value;
    const developerTimeZone = +this.timesheetForm.controls['developerTimezone'].value;
    const developerTimeHour = +developerTime.split('-')[0];
    
    const clientTimeZone = this.timesheetForm.controls['clientTimezone'].value;
    if (clientTimeZone) {
      const difference = clientTimeZone - developerTimeZone;
      let selectedTimeZone = Math.floor(+developerTimeHour + difference);
      if (selectedTimeZone > 24) {
        selectedTimeZone = selectedTimeZone - 24;
      }
      this.timesheetForm.controls['clientTime'].setValue(`${selectedTimeZone}-${selectedTimeZone+1}`);  
    }
    
    const agencyTimeZone = this.timesheetForm.controls['agencyTimezone'].value;
    if (agencyTimeZone) {
      const differenceAgency = agencyTimeZone - developerTimeZone;
      let selectedTimeZoneAgency = Math.floor(+developerTimeHour + differenceAgency);
      if (selectedTimeZoneAgency > 24) {
        selectedTimeZoneAgency = selectedTimeZoneAgency - 24;
      }
      this.timesheetForm.controls['agencyTime'].setValue(`${selectedTimeZoneAgency}-${selectedTimeZoneAgency+1}`);
    }
  }
}
