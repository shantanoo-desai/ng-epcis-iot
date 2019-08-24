import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Site } from '../types/Site';

/* GraphQL Queries and Mutations */
const getSites = gql`{
    sites {
      _id
      company
      siteName
      countryCode
      city
      sensors {
        mac
        bizLocation
      }
    }
  }`;

const removeSite = gql`
  mutation removeSite($siteID: ID!) {
    removeSite(siteId: $siteID) {
      _id
    }
  }
`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subscribedSites: Site[] = [];
  removedSiteInfo = {};
  loading = true;
  error: any;

  constructor(private apollo: Apollo,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query: getSites
    }).valueChanges.subscribe((result: any) => {
        this.subscribedSites = result.data && result.data.sites;
        this.loading = result.loading;
        this.error = result.error;
    });
  }

  removeSite(index: number) {

    this.apollo.mutate({
      mutation: removeSite,
      variables: {
        siteID: this.subscribedSites[index]._id
      }
    })
    .subscribe(() => {
      // console.log(data);
      this.subscribedSites.splice(index, 1);
      this.snackBar.open('Site Removed', 'Done', {
        duration: 3000
      });
    }, (error) => {
      console.log('mutation error: ' + error);
      this.error = error;
    });
  }

}
