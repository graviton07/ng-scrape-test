import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SearchItem } from "./app.search-item.model";
import { map, switchMap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/html",
    //Authorization: "authkey",
    Accept: "text/html, application/xhtml+xml, */*"
  })
};

const headers = new HttpHeaders({
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "text/html",
  Authorization: "authkey",
  Accept: "text/html, application/xhtml+xml, */*"
});

@Injectable()
export class SearchService {
  apiRoot: string = "https://itunes.apple.com/search";
  apiScrape: string = "https://0gnzkk.csb.app";
  // apiScrape: string = "https://www.yamli.com/";
  constructor(private http: HttpClient) {}

  search(term: string): Observable<SearchItem[]> {
    // this.scrap2(term).subscribe();
    this.scrap(term);

    let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
    return this.http.jsonp(apiURL, "callback").pipe(
      map((res: any) => {
        //console.log(res.results);
        return res.results.map((item) => {
          return new SearchItem(
            item.trackName,
            item.artistName,
            item.trackViewUrl,
            item.artworkUrl30,
            item.artistId
          );
        });
      })
    );
  }

  scrap(term: string) {
    let apiURL = `${this.apiScrape}`;
    //  apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
    // console.log(apiURL);
    this.http
      .get(apiURL, {
        headers: new HttpHeaders()
          .set("Content-Type", "text")
          .append("Access-Control-Allow-Methods", "GET")
          .append("Access-Control-Allow-Origin", "*")
          .append(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"
          ),
        responseType: "text"
      })
      .subscribe((res) => {
        console.log(res);
        //this.htmlString = res.text();
      });
  }

  scrap2(term: string): Observable<any> {
    let apiURL = `${this.apiScrape}`;
    return this.http.get(apiURL, httpOptions).pipe(
      switchMap((xml: any) => {
        console.log(xml);
        return xml;
      })
    );
  }
}
