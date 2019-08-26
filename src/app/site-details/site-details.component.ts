import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { SitesService } from './sites.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

/* GraphQL Queries and Mutations */
const getSite = gql`
query site($siteId: ID!) {
  site(siteId: $siteId) {
    _id
    company
    siteName
    countryCode
    city
    sensors {
      mac
      bizLocation
    }
  }
}`;

const getBizLocationsQ = gql`
  query {
    bizLocations
  }
`;

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: [ './site-details.component.css' ],
  providers: [SitesService]
})

export class SiteDetailsComponent implements OnInit  {

  dynamicForm: FormGroup;
  macPattern = '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$';

  data = {sites: []};
  loading = true;
  error: any;
  siteId = '';

  finalData = {sites: []};

  countriesList: string[] = [];
  bizLocations: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private countryService: SitesService,
              private route: ActivatedRoute,
              private apollo: Apollo) {

    this.countryService.getCountryCode()
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
    this.getBizLocations();
    this.route.paramMap.subscribe((params: Params) => {
      // console.log(params.get('id'));
      this.siteId = params.get('id');
      // console.log(this.siteId);
      // this.setSites();
      if (this.siteId !== 'new') {
        this.getSpecifiSiteById();
      } else {
        this.dynamicForm = this.formBuilder.group({
        sites: this.formBuilder.array([])
        });
        this.addNewSite();
      }
    });
  }

  getBizLocations() {
    this.apollo.watchQuery({
      query: getBizLocationsQ,
    }).valueChanges.subscribe((result: any) => {
      this.bizLocations = result.data && result.data.bizLocations;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  getSpecifiSiteById() {
    this.apollo.watchQuery({
      query: getSite,
      variables: {
        siteId: this.siteId
      },
    }).valueChanges.subscribe((result: any) => {
      // console.log(result);
      if (result.data && result.data.site) {
        this.data.sites.push(result.data.site);
        this.setSites();
      }
      this.loading = result.loading;
      this.error = result.error;
    });
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

  createNewSite() {
    const createSite = gql`
      mutation createSite($siteInput: SiteInput!) {
        createSite(siteInput: $siteInput) {
          _id
        }
      }
    `;
    console.log(this.finalData);
    this.apollo.mutate({
      mutation: createSite,
      variables: {siteInput: this.finalData.sites[0]},
      }).subscribe(({data}) => {
        console.log(data);
      });

  }

  updateSite() {
    console.log('update site');
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

    (this.siteId === 'new') ? this.createNewSite() : this.updateSite();
  }
}
