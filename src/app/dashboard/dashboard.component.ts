import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  subscribedSites = [{
      company: 'acme',
      siteName: 'factory',
      countryCode: 'DE',
      city: 'frankfurt',
      sensors: [
        {
          mac: '00:11:DE:AD:BE:EF',
          bizLocation: 'location1'
        },
        {
          mac: '11:11:DE:AD:BE:EF',
          bizLocation: 'location2'
        }
      ]
    },
    {
      company: 'acme',
      siteName: 'factory',
      countryCode: 'DE',
      city: 'frankfurt',
      sensors: [
        {
          mac: '00:11:DE:AD:BE:EF',
          bizLocation: 'location1'
        },
        {
          mac: '11:11:DE:AD:BE:EF',
          bizLocation: 'location2'
        }
      ]
    }];

    removeSite(index: number) {
      this.subscribedSites.splice(index,1);
    }
}
