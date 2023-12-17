import { LocalisationResponse } from '../interfaces/localisation.interface';

export class Localisation {
  latitude: string = '';
  longtitude: string = '';
  locationName: string = '';

  constructor(LocalisationResponseData?: LocalisationResponse) {
    Object.assign(this, LocalisationResponseData);
  }
}
