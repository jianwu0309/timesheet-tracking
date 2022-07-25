import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { AppService } from './app.service';
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
    '4-5',
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
  countries = {
    america: [
      'Canada',
      'United States',
    ],
    asia_oceania: [
      'Australia',
      'China',
      'Singapore',
      'Hong Kong',
      'Taiwan',
      'Saudi Arabia',
      'Japan',
      'New Zealand',
      'Israel'
    ],
    europe: [
      'Norway',
      'Belgium',
      'United Kingdom',
      'Denmark',
      'Finland',
      'France',
      'Germany',
      'Luxembourg',
      'Sweden',
      'Switzerland',
      'Ireland',
      'Iceland',
    ],
    africa: [
      'Africa'
    ]
  }
  timesheetForm: FormGroup;
  records: any[] = [];
  timezoneHashMap: any = {};
  isLoading: boolean = false;
  noRecords: boolean = false;
  chart: any;
  totalRecords = 0;
  minShowingRecords = 0;
  maxShowingRecords = 0;
  filter = {
    limit: 20,
    offset: 0,
    pageNo: 1,
    listPageNo: 1,
  };
  enableNextPage: boolean = true;
  active = 1;
  selectedCountries: string[] = [];
  countriesFilter: any = [];

  constructor(private appService: AppService, private router: Router) {
    this.timesheetForm = this.initializeForm();
    this.timesheetForm.controls['clientTime'].disable({ onlySelf: false });
    this.timesheetForm.controls['agencyTime'].disable({ onlySelf: false });
    this.setCountriesFilter();
    this.selectTimezone();
  }

  ngOnInit(): void {
    for (const zone of this.timezones) {
      this.timezoneHashMap[zone.id] = zone.value;
    }
    this.getRecords();
    this.getRecordStats();
  }

  setCountriesFilter() {
    for (const country of this.countries.america) {
      this.countriesFilter.push({ group: 'America', country });
    }
    for (const country of this.countries.asia_oceania) {
      this.countriesFilter.push({ group: 'Asia Oceania', country });
    }
    for (const country of this.countries.europe) {
      this.countriesFilter.push({ group: 'Europe', country });
    }
    this.countriesFilter.push({ group: 'Africa', country: 'Africa' });
  }

  initializeForm() {
    let data: any = localStorage.getItem('data');
    if (data) {
      data = JSON.parse(data);
    }
    return new FormGroup({
      id: new FormControl(),
      developerTime: new FormControl(data && data.developerTime || ''),
      developerTimezone: new FormControl(data && data.developerTimezone || ''),
      clientTime: new FormControl(''),
      clientTimezone: new FormControl(''),
      agencyTime: new FormControl(''),
      agencyTimezone: new FormControl(10),
      country: new FormControl(undefined),
    });
  }

  reset() {
    this.timesheetForm.setValue({
      ...this.timesheetForm.value,
      id: null,
      developerTime: '',
      // developerTimezone: '',
      clientTime: '',
      // clientTimezone: '',
      agencyTime: '',
      agencyTimezone: 10,
      // country: ''
    })
  }

  getRecords() {
    this.isLoading = true;
    this.appService.getRecords(this.filter).subscribe((data: any) => {
      this.totalRecords = data.data.total;
      this.records = data.data.records;
      this.isLoading = false;
      this.noRecords = !this.records.length;
      this.filter.listPageNo = this.filter.pageNo;
    });
  }

  resetPaging() {
    this.filter.pageNo = 0;
    this.filter.offset = 0;
  }

  next() {
    this.filter.pageNo += 1;
    this.filter.offset = this.filter.limit * this.filter.pageNo;
    this.getRecords();
  }

  previous() {
    this.filter.pageNo -= 1;
    this.filter.offset = this.filter.limit * this.filter.pageNo;
    this.getRecords();
  }

  goToPageNo(pageNo: number) {
    this.filter.pageNo = pageNo;
    this.filter.offset = this.filter.limit * (this.filter.pageNo - 1);
    this.getRecords();
  }

  setMaxShowingRecords() {
    this.minShowingRecords = this.totalRecords ? (this.filter.pageNo * this.filter.limit) + 1 : 0;
    const maxShowingRecords = (this.filter.pageNo + 1) * this.filter.limit;
    this.maxShowingRecords = maxShowingRecords >= this.totalRecords ? this.totalRecords : maxShowingRecords;
  }

  applyFilter() {
    this.filter.limit = 20;
    this.filter.offset = 0;
    this.getRecords();
  }

  getRecordStats() {
    this.isLoading = true;
    this.appService.getRecordStats(this.selectedCountries).subscribe((data: any) => {
      this.isLoading = false;
      const chartData = [];
      const hashMap: any = {};
      for (const d of data.data) {
        hashMap[d.time] = d;
      }
      for (const time of this.times) {
        if (hashMap[time]) {
          chartData.push(hashMap[time]);
        }
      }
      this.drawChart(chartData);
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
      if (selectedTimeZone < 0) {
        selectedTimeZone = developerTimeHour - selectedTimeZone;
        selectedTimeZone = 24 - selectedTimeZone;
      }
      this.timesheetForm.controls['clientTime'].setValue(`${selectedTimeZone}-${selectedTimeZone < 24 ? selectedTimeZone+1 : 1}`);  
    }
    
    const agencyTimeZone = this.timesheetForm.controls['agencyTimezone'].value;
    if (agencyTimeZone) {
      const differenceAgency = agencyTimeZone - developerTimeZone;
      let selectedTimeZoneAgency = Math.floor(+developerTimeHour + differenceAgency);
      if (selectedTimeZoneAgency > 24) {
        selectedTimeZoneAgency = selectedTimeZoneAgency - 24;
      }
      if (selectedTimeZoneAgency < 0) {
        selectedTimeZoneAgency = developerTimeHour - selectedTimeZoneAgency;
        selectedTimeZoneAgency = 24 - selectedTimeZoneAgency;
      }
      this.timesheetForm.controls['agencyTime'].setValue(`${selectedTimeZoneAgency}-${selectedTimeZoneAgency < 24 ? selectedTimeZoneAgency+1 : 1}`);
    }
  }

  editRecord(record: any) {
    this.timesheetForm.setValue({
      id: record.id,
      developerTime: record.developerTime,
      developerTimezone: record.developerTimezone,
      clientTime: record.clientTime,
      clientTimezone: record.clientTimezone,
      agencyTime: record.agencyTime,
      agencyTimezone: record.agencyTimezone,
      country: record.country
    });
  }

  saveRecord() {
    this.isLoading = true;
    const payload = {
      ...this.timesheetForm.value,
      id: this.timesheetForm.controls['id'].value,
      clientTime: this.timesheetForm.controls['clientTime'].value || null,
      clientTimezone: this.timesheetForm.controls['clientTimezone'].value || null,
      agencyTime: this.timesheetForm.controls['agencyTime'].value,
      country: this.timesheetForm.controls['country'].value || null
    };
    this.appService.saveRecord(payload).subscribe(() => {
      this.isLoading = false;
      this.getRecords();
      this.getRecordStats();
      this.saveInLocalStorage();
      this.reset();
    });
  }

  saveInLocalStorage() {
    const data = this.timesheetForm.value;
    localStorage.setItem('data', JSON.stringify(data));
  }

  deleteRecord(id: number) {
    if(confirm('Are you sure to delete the record?')) {
      this.isLoading = true;
      this.appService.deleteRecord(id).subscribe(() => {
        this.isLoading = false;
        this.getRecords();
        this.getRecordStats();
      });
    }
  }

  drawChart(data: any) {
    this.chart = new Chart({
        chart: {
          type: 'column',
          width: 1000,
          height: 500,
        },
        title: {
          text: 'Stats'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: data.map((d: any) => d.time),
          title: {
              text: null
          }
        },
        yAxis: {
            min: 0,
            allowDecimals: false,
            title: {
                text: ''
            },
            labels: {
                overflow: 'justify'
            }
        },
        series: [{
            name: 'Timeslots',
            type: 'column',
            data: data.map((d: any) => +d.count),
            dataLabels: {
              enabled: true
            }
        }]
    });
  }

  navChange(ev: any) {
    if (ev.nextId === 2) {
      // this.getRecordStats();
    }
  }

  onCountriesSelect() {
    if (this.selectedCountries.includes('America')) {
      this.selectedCountries.push(...this.countries.america);
    }
    if (this.selectedCountries.includes('Europe')) {
      this.selectedCountries.push(...this.countries.europe);
    }
    if (this.selectedCountries.includes('Asia Oceania')) {
      this.selectedCountries.push(...this.countries.asia_oceania);
    }
    this.getRecordStats();
  }
}
