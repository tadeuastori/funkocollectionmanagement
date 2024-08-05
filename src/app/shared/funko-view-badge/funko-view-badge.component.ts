import { Component, Input, OnInit } from '@angular/core';
import { StyleTypes } from '../../core/enums/style-types.enum';

@Component({
  selector: 'app-funko-view-badge',
  standalone: true,
  imports: [],
  templateUrl: './funko-view-badge.component.html',
  styleUrl: './funko-view-badge.component.less',
})
export class FunkoViewBadgeComponent implements OnInit {
  @Input() fullList: string[] = [];

  funkoViewBadgeTypes = StyleTypes;
  funkoViewBadgeType: StyleTypes = StyleTypes.LIGHT;

  listPrimary: string[] = ['walmart'];
  listSecundary: string[] = ['metallic', 'diamond', 'diamond comics'];
  listSucess: string[] = ['glitter'];
  listDanger: string[] = [];
  listWarning: string[] = ['glow', 'hot topic', 'glows in the dark'];
  listInfo: string[] = [];
  listLight: string[] = ['px previews'];
  listDark: string[] = [];

  badgeType: string = 'light';
  hasValue: boolean = false;

  newList: { item: string; funkoViewBadgeType: StyleTypes }[] = [];

  constructor() {}
  ngOnInit(): void {
    this.hasValue = this.fullList.length > 0;

    this.fullList.forEach((item) => {
      this.newList.push({
        item: item,
        funkoViewBadgeType: this.getBadgeType(item),
      });
    });
  }

  getBadgeType(item: string): StyleTypes {
    if (this.listPrimary.includes(item.toLowerCase())) {
      return StyleTypes.PRIMARY;
    }

    if (this.listSecundary.includes(item.toLowerCase())) {
      return StyleTypes.SECONDARY;
    }

    if (this.listSucess.includes(item.toLowerCase())) {
      return StyleTypes.SUCCESS;
    }

    if (this.listDanger.includes(item.toLowerCase())) {
      return StyleTypes.DANGER;
    }

    if (this.listWarning.includes(item.toLowerCase())) {
      return StyleTypes.WARNING;
    }

    if (this.listInfo.includes(item.toLowerCase())) {
      return StyleTypes.INFO;
    }

    if (this.listLight.includes(item.toLowerCase())) {
      return StyleTypes.LIGHT;
    }

    if (this.listDark.includes(item.toLowerCase())) {
      return StyleTypes.DARK;
    }

    return StyleTypes.LIGHT;
  }
}
