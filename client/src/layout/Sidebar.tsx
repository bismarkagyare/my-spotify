import { Podcast, MicVocal, Music, ListMusic, CircleUserRound } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import logo from "@/assets/spotify-full-green.png";

// Menu items.
const items = [
  {
    title: "Profile",
    url: "#",
    icon: CircleUserRound,
  },
  {
    title: "Top Artists",
    url: "#",
    icon: MicVocal,
  },
  {
    title: "Top Tracks",
    url: "#",
    icon: Podcast,
  },
  {
    title: "Recent",
    url: "#",
    icon: Music,
  },
  {
    title: "Playlist",
    url: "#",
    icon: ListMusic,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <img src={logo} alt="logo" className="w-[150px] h-full object-contain" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="ml-4">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
