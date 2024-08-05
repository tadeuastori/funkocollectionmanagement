import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pagination', standalone: true })
export class PaginationPipe implements PipeTransform {
  transform(value: any[], itemsPerPage: any, page: any): any {
    // console.log(value, page, ...value.slice(items * (page - 1), items * page));
    return [...value.slice(itemsPerPage * page, itemsPerPage * (page + 1))];
  }
}
