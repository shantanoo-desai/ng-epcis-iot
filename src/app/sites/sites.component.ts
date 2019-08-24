import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { SitesService } from './sites.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: [ './sites.component.css' ],
  providers: [SitesService]
})
export class SitesComponent implements OnInit  {

  dynamicForm: FormGroup;
  macPattern = '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$';

  data = {
      sites: [{
      company: 'acme',
      siteName: 'factory',
      countryCode: 'DE',
      city: 'frankfurt',
      sensors: [
        {
          mac: '00:11:DE:AD:BE:EF',
          bizLocation: 'location1'
        },
        {
          mac: '11:11:DE:AD:BE:EF',
          bizLocation: 'location2'
        }
      ]
    }]
  };

  finalData = {};

  countriesList: string[] = [];

  constructor(private formBuilder: FormBuilder, private countryService: SitesService) {
    countryService.getCountryCode()
      .subscribe((data: any) => {
        this.countriesList = data.map(c => {
          return  {
            code: c.alpha2Code,
            name: c.name
          };
        });
      });
  }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      sites: this.formBuilder.array([])
    });
    // this.setSites();
    this.addNewSite();
  }

  addNewSite() {
    const control = this.dynamicForm.controls.sites as FormArray;
    control.push(
      this.formBuilder.group({
        company: new FormControl('', Validators.required),
        siteName: new FormControl('', Validators.required),
        countryCode: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        sensors: this.formBuilder.array([
          this.formBuilder.group({
            mac: new FormControl('', [ Validators.pattern(this.macPattern), Validators.required]),
            bizLocation: new FormControl('', Validators.required)
          })
        ])
      })
    );
  }

  deleteSite(index: number) {
    const control = this.dynamicForm.controls.sites as FormArray;
    control.removeAt(index);
  }

  addNewSensor(control: any) {
    control.push(
      this.formBuilder.group({
        mac: new FormControl('', [ Validators.pattern(this.macPattern), Validators.required]),
        bizLocation: new FormControl('', Validators.required)
      })
    );
  }

  deleteSensor(control: any, index: number) {
    control.removeAt(index);
  }

  setSites() {
    const control = this.dynamicForm.controls.sites as FormArray;
    this.data.sites.forEach(site => {
      control.push(
        this.formBuilder.group({
          company: site.company,
          siteName: site.siteName,
          countryCode: site.countryCode,
          city: site.city,
          sensors: this.setSensors(site)
        })
      );
    });
  }

  setSensors(x: any) {
    const arr = new FormArray([]);
    x.sensors.forEach(sensor => {
      arr.push(
        this.formBuilder.group({
          mac: sensor.mac,
          bizLocation: sensor.bizLocation
        })
      );
    });
    return arr;
  }

  onSubmit() {
    const sitesToSubmit = this.dynamicForm.value;
    sitesToSubmit.sites.forEach(site => {
      let topic = '';
      topic = `${site.company}/${site.siteName}/${site.countryCode}/${site.city}/+/env`;
      console.log(topic);
      site.topic = topic;
    });
    this.finalData = sitesToSubmit;
  }
}
