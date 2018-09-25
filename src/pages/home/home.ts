import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform } from "ionic-angular";
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent } from "@ionic-native/google-maps";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map')
  private mapElement: ElementRef;
  private map: GoogleMap;
  private location: LatLng;

  constructor(private platform: Platform,
    private googleMaps: GoogleMaps) {
    this.location = new LatLng(26.912434, 75.787270);
    console.log("location", this.location);

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;
      this.map = GoogleMaps.create(element);
      console.log("elementt", element);
      console.log("map", this.map);
      

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        debugger;
        let options = {
          target: this.location,
          zoom: 8
        };
        console.log("options", options);
        
        this.map.moveCamera(options);
        setTimeout(() => { this.addMarker() }, 2000);
      });
    });
  }

  addMarker() {
    this.map.addMarker({
      title: 'My Marker',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.location.lat,
        lng: this.location.lng
      }
    })
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          alert('Marker Clicked');
        });
      });
  }
}