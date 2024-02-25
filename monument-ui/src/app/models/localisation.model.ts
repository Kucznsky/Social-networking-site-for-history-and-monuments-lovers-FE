import { LocalisationResponse } from '../interfaces';

export class Localisation {
  latitude: number;
  longtitude: number;
  localisationName: string;

  constructor(LocalisationResponseData?: LocalisationResponse) {
    Object.assign(this, LocalisationResponseData);
  }
}
