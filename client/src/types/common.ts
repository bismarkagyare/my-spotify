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
  following?: number;
  playlists?: number;
}
export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyPlaylist {
  name: string;
  id: string;
  tracks: {
    total: number;
  };
}

export interface SpotifyArtist {
  name: string;
  id: string;
}


export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  album: {
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  artists: Array<{
    name: string;
  }>;
}