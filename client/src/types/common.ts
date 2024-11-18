export type HeaderProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SideMenuProps = {
  closeDrawer: () => void;
  isDrawerOpen: boolean;
};

export type SideBarProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
};