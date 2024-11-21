import { SpotifyImage } from "@/types/common";

interface ProfileAvatarProps {
  image?: Partial<SpotifyImage>;
  size?: number;
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  image, 
  size = 232,
  className = ''
}) => {
  return (
    <div 
      className={`rounded-full bg-[#282828] overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {image?.url ? (
        <img 
          src={image.url}
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      )}
    </div>
  );
};