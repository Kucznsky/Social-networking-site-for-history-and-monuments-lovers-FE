import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss'],
})
export class MapComponentComponent implements OnInit {
  @Input() localisation = '53.13333,23.16433';
  @Input() isOpenInNewPostForm = false;
  @Output() selectedCoordinates: EventEmitter<string> = new EventEmitter();

  private map: any;
  private marker: any;
  private popup: any;

  public ngOnInit(): void {
    const coordinates = this.localisation
      .split(',')
      .map((coordinate) => parseFloat(coordinate));
    this.map = L.map('map').setView([coordinates[0], coordinates[1]], 12);
    this.popup = L.popup();
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    if (!this.isOpenInNewPostForm) {
      this.marker = L.marker([coordinates[0], coordinates[1]]).addTo(this.map);
    }
    if(this.isOpenInNewPostForm){
      this.map.on('click', this.selectLocalisation)
    }
  }

  private selectLocalisation = (event: any) => {
    this.popup
        .setLatLng(event.latlng)
        .setContent(`Selected ${event.latlng.lat.toString()}, ${event.latlng.lng.toString()}`)
        .openOn(this.map);

    this.selectedCoordinates.emit(`${event.latlng.lat.toString()},${event.latlng.lng.toString()}`)
  }
}
