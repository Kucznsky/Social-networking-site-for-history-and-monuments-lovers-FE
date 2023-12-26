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
  @Output() activeCategoryFilters = new EventEmitter<Category[]>();
  public dateFilterClicked = true;
  public sortingOptions = SortingOptions;
  public dateFilterLabel = SortingOptions.TopAllTime;
  public categories = [
    { name: Category.IndustrialObjects, isSelected: true },
    { name: Category.MilitaryStructures, isSelected: true },
    { name: Category.Other, isSelected: true },
    { name: Category.PalacesAndVillas, isSelected: true },
    { name: Category.ReligiousObjects, isSelected: true },
  ];

  constructor() {}

  public buttonClicked(filterBy: SortingOptions) {
    this.dateFilterClicked = filterBy !== SortingOptions.New;
    this.dateFilterLabel = filterBy;
    this.currentSortingCondition.emit(filterBy);
  }

  public emitActiveFilters(): void {
    const activeFilters: Category[] = [];
    this.categories.forEach((category) => {
      if (category.isSelected) {
        activeFilters.push(category.name);
      }
    });
    this.activeCategoryFilters.emit(activeFilters);
  }
}
