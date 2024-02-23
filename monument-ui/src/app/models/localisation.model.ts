import { LocalisationResponse } from '../interfaces';

export class Localisation {
  latitude: string = '';
  longtitude: string = '';

  constructor(LocalisationResponseData?: LocalisationResponse) {
    Object.assign(this, LocalisationResponseData);
  }
}
