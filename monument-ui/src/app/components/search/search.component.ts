import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBy } from 'src/app/enums';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public searchOptions = SearchBy;
  public searchFormControl = '';

  public selectedOption = SearchBy.Title;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  public optionSelected(option: SearchBy): void {
    this.selectedOption = option;
  }

  public serchForPost(): void {

    this.router.navigate(['home'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        searchBy: this.selectedOption,
        searchedPost: this.searchFormControl,
      },
      // skipLocationChange: true,
    });
  }
}
