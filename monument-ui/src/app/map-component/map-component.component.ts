import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Localisation } from '../models';

declare const L: any;

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss'],
})
export class MapComponentComponent implements OnInit {
  @Input() localisation: Localisation = {latitude: 53.13333, longtitude: 23.16433, localisationName: 'Bialystok'};
  @Input() isOpenInNewPostForm = false;
  @Output() selectedCoordinates: EventEmitter<Localisation> = new EventEmitter();

  private map: any;
  private marker: any;
  private popup: any;
  private geocodeService: any

  public ngOnInit(): void {
    this.map = L.map('map').setView([this.localisation.latitude, this.localisation.longtitude], 12);
    this.popup = L.popup();
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    if (!this.isOpenInNewPostForm) {
      this.marker = L.marker([this.localisation.latitude, this.localisation.longtitude]).addTo(this.map);
      this.marker.bindPopup(`<b>${this.localisation.latitude}, ${this.localisation.longtitude}</b><br>${this.localisation.localisationName}.`).openPopup()
    }
    if(this.isOpenInNewPostForm){
      this.map.on('click', this.selectLocalisation)
    }
    this.geocodeService = L.esri.Geocoding.geocodeService();
  }

  private selectLocalisation = (event: any) => {
    let localisationName: string
    this.geocodeService.reverse().latlng(event.latlng).run((error, result) => {
      localisationName = `${result.address.Subregion}, ${result.address.Region}, ${result.address.CntryName}`
      const localisationObj = new Localisation({latitude: event.latlng.lat, longtitude: event.latlng.lng, localisationName: localisationName})
      this.selectedCoordinates.emit(localisationObj)
    });


    this.popup
        .setLatLng(event.latlng)
        .setContent(`Selected ${event.latlng.lat.toString()}, ${event.latlng.lng.toString()}`)
        .openOn(this.map);
  }}
