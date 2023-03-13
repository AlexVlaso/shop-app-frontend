import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';
import { State } from '../model/state';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countriesUrl = environment.shopApiUrl + '/countries';
  statesUrl = environment.shopApiUrl + '/states';
  constructor(private httpClient: HttpClient) {}

  getListOfCountries(): Observable<countryResponse> {
    return this.httpClient.get<countryResponse>(this.countriesUrl);
  }
  getListOfStates(code: string): Observable<stateResponse> {
    return this.httpClient.get<stateResponse>(
      `${this.statesUrl}/search/findStatesByCountryCode?code=${code}`
    );
  }
}
interface countryResponse {
  _embedded: {
    countries: Country[];
  };
}
interface stateResponse {
  _embedded: {
    states: State[];
  };
}
