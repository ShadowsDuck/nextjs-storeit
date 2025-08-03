"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.action";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Image
              src="/assets/icons/menu.svg"
              alt="Menu"
              width={30}
              height={30}
            />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="shad-sheet h-screen px-3 w-[300px] sm:w-[350px] bg-white border-l border-gray-200"
        >
          <SheetHeader className="pb-4">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />

              <div className="flex-1">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetHeader>

          <div className="flex flex-col h-full">
            <nav className="mobile-nav flex-1">
              <ul className="mobile-nav-list">
                {navItems.map(({ name, icon, url }) => (
                  <li key={name}>
                    <Link
                      href={url}
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      <div
                        className={cn(
                          "mobile-nav-item",
                          pathname === url && "shad-active"
                        )}
                      >
                        <Image
                          src={icon}
                          alt={name}
                          width={24}
                          height={24}
                          className={cn(
                            "nav-icon",
                            pathname === url && "nav-icon-active"
                          )}
                        />
                        <p>{name}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto pt-5">
              <Separator className="my-5 bg-light-200/20" />
              <div className="flex flex-col justify-between gap-5 pb-5">
                <FileUploader ownerId={ownerId} accountId={accountId} />
                <Button
                  type="button"
                  className="mobile-sign-out-button"
                  onClick={async () => {
                    await signOutUser();
                  }}
                >
                  <Image
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    width={24}
                    height={24}
                  />
                  <p>Logout</p>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
