import logo from "@/assets/spotify-full-green.png";
import { routes } from "@/routes";
import { ConfigProvider, Menu } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import { SideMenuProps } from "@/types/common";
import { Podcast, MicVocal, Music, ListMusic, CircleUserRound } from "lucide-react";
import { pathsArr } from "@/routes";

interface MenuItemType {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: ItemType<MenuItemType>[];
}

type ItemType<T> = T | MenuDividerType | SubMenuType<T> | MenuItemGroupType<T>;

interface MenuDividerType {
  type: "divider";
}

interface SubMenuType<T> {
  type: "submenu";
  children: ItemType<T>[];
}

interface MenuItemGroupType<T> {
  type: "group";
  children: ItemType<T>[];
}

//interface GetItemProps extends MenuItemType {}
type GetItemProps = MenuItemType;

function getItem(label: string, key: string, icon: JSX.Element, children?: GetItemProps[], type?: ""): GetItemProps {
  return {
    key,
    icon,
    label: children ? (
      <span className="text-base font-semibold">{label}</span>
    ) : (
      <NavLink to={key}>
        <span className="text-base font-semibold "> {label} </span>
      </NavLink>
    ),
    ...(children ? { children } : {}),
    ...(type ? { type } : {}),
  };
}

const items = [
  getItem(routes.profile.title, routes.profile.path, <CircleUserRound color="#fff" />),

  getItem(routes.topArtists.title, routes.topArtists.path, <MicVocal color="#fff" />),

  getItem(routes.topTracks.title, routes.topTracks.path, <Podcast color="#fff" />),
  getItem(routes.recent.title, routes.recent.path, <Music color="#fff" />),
  getItem(routes.playlist.title, routes.playlist.path, <ListMusic color="#fff" />),
];

export const SideMenu = ({ closeDrawer, isDrawerOpen }: SideMenuProps) => {
  const location = useLocation();
  const selectedKey = pathsArr.find((elem) => elem.includes(location.pathname));

  const onClick = () => {
    if (isDrawerOpen) {
      closeDrawer();
    }
  };

  return (
    <aside className="flex flex-col justify-between h-full bg-black">
      <div>
        <div className="flex items-center justify-between py-2 pl-4 mb-4 bg-black border-b-4 border-black md:py-4 ">
          <img src={logo} className="h-12 w-30" alt="spotify logo" />
          <button onClick={() => closeDrawer()}>
            <AiOutlineClose className="text-2xl text-gray-500 cursor-pointer hover:opacity-70 active:opacity-0 lg:hidden " />
          </button>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                iconSize: 24,
                itemColor: "#f5f2f2",
                itemMarginBlock: 6,
                itemSelectedColor: "#fff",
                itemSelectedBg: "#242424",
                itemHoverBg: "#242424",
                itemHoverColor: "#f3f3f3",
                itemActiveBg: "transparent",
              },
            },
          }}
        >
          <Menu
            className="!border-none main-menu bg-black"
            onClick={onClick}
            style={{
              width: 250,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
            selectedKeys={[selectedKey ?? ""]}
          />
        </ConfigProvider>
      </div>
    </aside>
  );
};
