import * as React from "react"
import * as NavbarMenuPrimitive from "@radix-ui/react-Navbar-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavbarMenu = React.forwardRef<
  React.ElementRef<typeof NavbarMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavbarMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavbarMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavbarMenuViewport />
  </NavbarMenuPrimitive.Root>
))
NavbarMenu.displayName = NavbarMenuPrimitive.Root.displayName

const NavbarMenuList = React.forwardRef<
  React.ElementRef<typeof NavbarMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavbarMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavbarMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavbarMenuList.displayName = NavbarMenuPrimitive.List.displayName

const NavbarMenuItem = NavbarMenuPrimitive.Item

const NavbarMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

const NavbarMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavbarMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavbarMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavbarMenuPrimitive.Trigger
    ref={ref}
    className={cn(NavbarMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavbarMenuPrimitive.Trigger>
))
NavbarMenuTrigger.displayName = NavbarMenuPrimitive.Trigger.displayName

const NavbarMenuContent = React.forwardRef<
  React.ElementRef<typeof NavbarMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavbarMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavbarMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavbarMenuContent.displayName = NavbarMenuPrimitive.Content.displayName

const NavbarMenuLink = NavbarMenuPrimitive.Link

const NavbarMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavbarMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavbarMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavbarMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-Navbar-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-Navbar-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavbarMenuViewport.displayName =
  NavbarMenuPrimitive.Viewport.displayName

const NavbarMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavbarMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavbarMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavbarMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavbarMenuPrimitive.Indicator>
))
NavbarMenuIndicator.displayName =
  NavbarMenuPrimitive.Indicator.displayName

export {
  NavbarMenuTriggerStyle,
  NavbarMenu,
  NavbarMenuList,
  NavbarMenuItem,
  NavbarMenuContent,
  NavbarMenuTrigger,
  NavbarMenuLink,
  NavbarMenuIndicator,
  NavbarMenuViewport,
}
