import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Category, SortingOptions } from 'src/app/enums';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  @Output() currentSortingCondition = new EventEmitter<SortingOptions>();
  public dateFilterClicked = true;
  public sortingOptions = SortingOptions;
  public dateFilterLabel = SortingOptions.TopAllTime;
  public categories = Category;

  constructor() {}

  public buttonClicked(filterBy: SortingOptions) {
    this.dateFilterClicked = filterBy !== SortingOptions.New;
    this.dateFilterLabel = filterBy;
    this.currentSortingCondition.emit(filterBy);
  }
}
