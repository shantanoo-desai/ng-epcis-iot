import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SitesService {
  private _restCountriesUrl = 'https://restcountries.eu/rest/v2/all?fields=alpha2Code';
  constructor(private http: HttpClient) {}

  getCountryCode() {
    return this.http.get(this._restCountriesUrl);

  }
}