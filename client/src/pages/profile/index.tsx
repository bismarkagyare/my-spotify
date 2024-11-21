import { getUserProfile } from "@/services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import Loader from "@/components/loader/Loader";
import useAuth from "@/hooks/useAuth";
import { ProfileAvatar } from "./ProfileAvatar";

const Profile = () => {
  const { logout } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: [queryKeys.USERPROFILE],
    queryFn: getUserProfile,
  });

  console.log("user profile data:", profile);

  if (isLoading) return <Loader message="loading profile..." />;

  return (
    <div className="p-6 text-white bg-[#191414]">
      <div className="flex gap-6 items-start">
        {/* Profile Image */}
        <div>
          <ProfileAvatar image={profile?.images?.[0]} size={232} />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col gap-2">
          <span className="text-[#b3b3b3] text-sm tracking-widest uppercase">Profile</span>
          <h1 className="text-5xl font-bold mt-2 mb-4">{profile?.display_name}</h1>

          {/* Stats */}
          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-1">
              <span className="text-[#1DB954] font-bold">{profile?.followers.total}</span>
              <span className="text-[#b3b3b3] text-sm tracking-wider uppercase">Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#1DB954] font-bold">{profile?.following}</span>
              <span className="text-[#b3b3b3] text-sm tracking-wider uppercase">Following</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#1DB954] font-bold">{profile?.playlists}</span>
              <span className="text-[#b3b3b3] text-sm tracking-wider uppercase">Playlists</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 
                px-8 py-2 rounded-full text-sm font-bold transition-all duration-200 
                hover:scale-102 w-fit"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
