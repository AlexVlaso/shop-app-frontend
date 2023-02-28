import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countryUrl = 'http://localhost:8080/api/countries';
  constructor(private httpClient: HttpClient) {}

  getListOfCountries() {}
}
