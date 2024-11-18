import WebLogo from "@/assets/spotify-full-green.png";
import mobileLogo from "@/assets/spotify-mobile-logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Bell, Home } from "lucide-react";
import DropdownUser from "./components/DropdownUser";
import { HeaderProps } from "@/types/common";
import { CiSearch } from "react-icons/ci";

export default function Header({ isDrawerOpen, setIsDrawerOpen }: HeaderProps) {
  return (
    <header className="flex w-full sticky top-0 z-50 shadow-sm bg-[#191414] pr-6 pl-3 justify-between md:px-6 py-3">
      <div className="flex items-center space-x-2 lg:hidden">
        <GiHamburgerMenu
          className={`h-8 w-8 cursor-pointer text-white stroke-2 hover:opacity-80 active:opacity-30 ${
            isDrawerOpen && "opacity-0"
          }`}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        />
        <img src={WebLogo} alt="Spotify" className="hidden md:block h-12 w-30 object-contain" />
        <img src={mobileLogo} alt="Spotify" className="block md:hidden h-10 w-15" />
      </div>

      <div className="hidden md:flex flex-1 justify-center items-center max-w-[420px] lg:ml-[240px]">
        <div className="flex items-center gap-2 w-full">
          <button className="p-2 rounded-full bg-[#121212] hover:bg-[#282828] transition-colors">
            <Home className="h-6 w-6 text-[#b3b3b3]" />
          </button>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CiSearch className="h-5 w-5 text-[#7f7f7f]" />
            </div>
            <input
              type="text"
              className="w-full py-[10px] pl-10 pr-3 rounded-full bg-[#242424] text-white text-[14px] placeholder-[#7f7f7f] focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="What do you want to play?"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 space-x-1">
        <Bell className="hidden md:block text-xl text-white cursor-pointer hover:text-[#1DB954]" />
        <DropdownUser />
      </div>
    </header>
  );
}
