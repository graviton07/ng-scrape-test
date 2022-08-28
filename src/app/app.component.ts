import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { SearchItem } from "./app.search-item.model";
import { SearchService } from "./app.search.service";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";
  loading: boolean = false;
  results: Observable<SearchItem[]>;
  searchField: FormControl;

  constructor(private itunes: SearchService) {}

  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap((_) => (this.loading = true)),
      switchMap((term) => this.itunes.search(term)),
      tap((_) => (this.loading = false))
    );
  }

  doSearch(term: string) {
    this.itunes.search(term);
  }
}
