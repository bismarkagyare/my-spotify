import { getUserProfile, getUserPlaylists, getFollowedArtists, getTopTracks } from "@/services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import Loader from "@/components/loader/Loader";
import useAuth from "@/hooks/useAuth";
import { ProfileAvatar } from "./ProfileAvatar";

const Profile = () => {
  const { logout } = useAuth();

  // Fetch user profile
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: [queryKeys.USERPROFILE],
    queryFn: getUserProfile,
  });

  // Fetch user playlists
  const {
    data: playlists,
    isLoading: isPlaylistsLoading,
    isError: isPlaylistsError,
  } = useQuery({
    queryKey: [queryKeys.USERPLAYLISTS],
    queryFn: getUserPlaylists,
  });

  // Fetch followed artists
  const {
    data: followedArtists,
    isLoading: isFollowedArtistsLoading,
    isError: isFollowedArtistsError,
  } = useQuery({
    queryKey: [queryKeys.FOLLOWEDARTISTS],
    queryFn: getFollowedArtists,
  });

  // Fetch top tracks
  const {
    data: topTracks,
    isLoading: isTopTracksLoading,
    isError: isTopTracksError,
  } = useQuery({
    queryKey: [queryKeys.TOPTRACKS],
    queryFn: () => getTopTracks("long_term"), // Fetch top tracks of all time
  });

  console.log("followed artists data:", followedArtists);
  console.log("top tracks data:", topTracks);

  // Show loader if any of the queries are still loading
  if (isProfileLoading || isPlaylistsLoading || isFollowedArtistsLoading || isTopTracksLoading) {
    return <Loader message="loading profile..." />;
  }

  // Show error message if any of the queries fail
  if (isProfileError || isPlaylistsError || isFollowedArtistsError || isTopTracksError) {
    return <p>Error loading profile data. Please try again.</p>;
  }

  return (
    <div className="p-4 md:p-6 text-white bg-[#191414]">
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Image */}
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <ProfileAvatar image={profile?.images?.[0]} size={232} />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col gap-2 w-full">
          <span className="text-[#b3b3b3] text-sm tracking-widest uppercase">Profile</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4">{profile?.display_name}</h1>

          {/* Stats */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
            <div className="flex items-center gap-1">
              <span className="text-[#1DB954] font-bold">{profile?.followers.total}</span>
              <span className="text-[#b3b3b3] text-sm tracking-wider uppercase">Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#1DB954] font-bold">{followedArtists?.length}</span>
              <span className="text-[#b3b3b3] text-sm tracking-wider uppercase">Following</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#1DB954] font-bold">{playlists?.length}</span>
              <span className="text-[#b3b3b3] text-sm tracking-wider uppercase">Playlists</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 
                px-8 py-2 rounded-full text-sm font-bold transition-all duration-200 
                hover:scale-102 w-full md:w-fit"
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Top Tracks Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Top Tracks of All Time</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-white/20">
                <th className="py-2">#</th>
                <th className="py-2">Title</th>
                <th className="py-2">Album</th>
                <th className="py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {topTracks?.map((track, index) => (
                <tr key={track.id} className="hover:bg-white/10 transition-colors">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={track.album.images[0]?.url}
                        alt={track.name}
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <p className="font-semibold">{track.name}</p>
                        <p className="text-sm text-[#b3b3b3]">
                          {track.artists.map((artist) => artist.name).join(", ")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 text-[#b3b3b3]">{track.album.name}</td>
                  <td className="py-2 text-[#b3b3b3]">
                    {new Date(track.duration_ms).toISOString().substr(14, 5)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;