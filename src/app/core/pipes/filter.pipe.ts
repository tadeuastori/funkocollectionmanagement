import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({ name: 'filter', standalone: true })
export class FilterPipe implements PipeTransform {
  transform(
    items: any[],
    searchText: string,
    fields: string[],
    filteredCount: any
  ): any[] {
    let newList: any[] = [];

    if (!items) {
      return [];
    }

    if (!searchText) {
      filteredCount.count = items.length;
      return items;
    }

    searchText = searchText.toLowerCase();

    fields.forEach((element) => {
      newList.push(
        ...items.filter((item) => {
          if (item && item[element]) {
            return item[element].toString().toLowerCase().includes(searchText);
          }
          return false;
        })
      );
    });

    let listReturn = newList.filter((c, index) => {
      return newList.indexOf(c) === index;
    });

    filteredCount.count = listReturn.length;

    return _.sortBy(listReturn, ['collection', 'name']);
  }
}
