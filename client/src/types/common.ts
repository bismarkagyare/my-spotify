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

export interface SpotifyProfile {
  display_name: string;
  id: string;
  images: { url: string }[];
  followers: { total: number };
  following: number;
  playlists: number;
}
export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}