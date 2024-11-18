import { SideMenu } from "./components/SidebarMenu";
import { SideBarProps } from "@/types/common";
import { Drawer } from "antd";

export function Sidebar({ isDrawerOpen, setIsDrawerOpen }: SideBarProps) {
  return (
    <>
      <Drawer
        title={false}
        closable={false}
        open={isDrawerOpen}
        placement="left"
        onClose={() => setIsDrawerOpen(false)}
        className="block lg:hidden"
      >
        <SideMenu isDrawerOpen={isDrawerOpen} closeDrawer={() => setIsDrawerOpen(false)} />
      </Drawer>

      <nav className="hidden lg:block">
        <SideMenu isDrawerOpen={isDrawerOpen} closeDrawer={() => setIsDrawerOpen(false)} />
      </nav>
    </>
  );
}
