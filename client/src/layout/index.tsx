import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        {/* <SidebarTrigger /> */}
        {/* {children} */}
      </main>
    </SidebarProvider>
  );
}
