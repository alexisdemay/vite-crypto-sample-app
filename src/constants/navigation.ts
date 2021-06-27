export interface Navigation {
  name: NavigationMenu;
  label: string;
  selected: boolean;
}

export enum NavigationMenu {
  DASHBOARD = 'dashboard',
  ACTUALITY = 'actuality'
}
