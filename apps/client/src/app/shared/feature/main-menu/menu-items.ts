import { faCog, faVault } from "@fortawesome/free-solid-svg-icons";

export type MenuItem = {
  icon: string;
  name: string;
  href: string;
};
export const MENU_ITEMS = [
  {
    icon: faVault,
    name: "Vault",
    href: "vault",
  },
  {
    icon: faCog,
    name: "Settings",
    href: "settings",
  }
];
