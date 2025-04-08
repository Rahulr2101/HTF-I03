import * as React from "react"
import {
  Home,
  LayoutDashboard,
  History,
  Settings2,
  User,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

// Sidebar menu data
const navItems = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "History",
    url: "#",
    icon: History,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
  },
]

const userData = {
  name: "Rahul Rajesh",
  email: "rahul@example.com",
  avatar: "/avatars/rahul.jpg", // You can change this to your own image path
}

export function AppSidebar({ onViewChange, ...props }) {
  const handleNavClick = (item) => {
    if (onViewChange) {
      onViewChange(item.title)
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
  
        <div className="text-xl font-semibold px-4 py-2">MyApp</div>


  
        <NavMain items={navItems} onItemClick={handleNavClick} />


      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}