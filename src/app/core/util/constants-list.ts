export const menuItemList: Array<{
  iconName: string;
  label: string;
  routerLink: string;
}> = [
  { iconName: 'bi bi-house', label: 'Home', routerLink: '' },
  { iconName: 'bi bi-person-add', label: 'Add Funko', routerLink: 'add-funko' },
  {
    iconName: 'bi bi-filetype-json',
    label: 'Generate JSON',
    routerLink: 'generate-json',
  },
];

export const linkItemList: Array<{
  iconName: string;
  label: string;
  routerLink: string;
}> = [
  {
    iconName: 'bi bi-github',
    label: 'Github',
    routerLink: 'https://github.com/tadeuastori',
  },
  {
    iconName: 'bi bi-linkedin',
    label: 'LinkedIn',
    routerLink: 'https://www.linkedin.com/in/carlosastori/',
  },
];
