"use client"

import * as React from "react"
import {Bot, LockIcon, UsersIcon,} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavProjects} from "@/components/nav-projects"
import {NavSecondary} from "@/components/nav-secondary"
import {NavUser} from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import useAuth from "@/hooks/useAuth.tsx";

const data = {
    navMain: [
        {
            title: "Thông tin người dùng",
            url: "/profile/information",
            icon: UsersIcon,
            isActive: true,
        },
        {
            title: "Dịch vụ",
            url: "/profile/services",
            icon: Bot,

        },
        /*{
          title: "Documentation",
          url: "#",
          icon: BookOpen,
          items: [
            {
              title: "Introduction",
              url: "#",
            },
            {
              title: "Get Started",
              url: "#",
            },
            {
              title: "Tutorials",
              url: "#",
            },
            {
              title: "Changelog",
              url: "#",
            },
          ],
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings2,
          items: [
            {
              title: "General",
              url: "#",
            },
            {
              title: "Team",
              url: "#",
            },
            {
              title: "Billing",
              url: "#",
            },
            {
              title: "Limits",
              url: "#",
            },
          ],
        },*/
    ],
    navSecondary: [
        /*{
          title: "Support",
          url: "#",
          icon: LifeBuoy,
        },
        {
          title: "Feedback",
          url: "#",
          icon: Send,
        },*/
    ],
    projects: [
        /*  {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
          },
          {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
          },
          {
            name: "Travel",
            url: "#",
            icon: Map,
          },*/
    ],
}

export function PartnerSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const auth = useAuth();

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div
                                    className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <LockIcon className="size-4"/>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">SSO Server</span>
                                    {/*<span className="truncate text-xs">Enterprise</span>*/}
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavProjects projects={data.projects}/>
                <NavSecondary items={data.navSecondary} className="mt-auto"/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    name: auth?.name,
                    email: auth?.email,
                    avatar: auth?.avatar,
                }}/>
            </SidebarFooter>
        </Sidebar>
    )
}
