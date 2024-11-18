import { lazy } from "react";

const Profile = lazy(() => import("@/pages/profile"));
const TopArtists = lazy(() => import("@/pages/topArtists"));
const TopTracks = lazy(() => import("@/pages/topTracks"));
const Recent = lazy(() => import("@/pages/recent"));
const Playlist = lazy(() => import("@/pages/playlist"));

export const paths = {
  profile: "/profile",
  topArtists: "/top-artists",
  topTracks: "/top-tracks",
  recent: "/recent",
  playlist: "/playlist",
};

export const routes = {
  profile: {
    title: "Profile",
    path: paths.profile,
    element: Profile,
  },
  topArtists: {
    title: "Top Artists",
    path: paths.topArtists,
    element: TopArtists,
  },
  topTracks: {
    title: "Top Tracks",
    path: paths.topTracks,
    element: TopTracks,
  },
  recent: {
    title: "Recent",
    path: paths.recent,
    element: Recent,
  },
  playlist: {
    title: "Playlist",
    path: paths.playlist,
    element: Playlist,
  },
};

export const pathsArr = Object.values(paths);
export const routesArr = Object.values(routes);

