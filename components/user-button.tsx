'use client';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/_config/firebase/firebase-config";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User } from "lucide-react";
import type { User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";

export const UserButton = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const getUserInitial = () => {
    if (!user) return <User className="h-4 w-4" />;
    if (user.displayName) return user.displayName.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return <User className="h-4 w-4" />;
  };

  return (
    <div className="flex items-center justify-center">
      {/* User Avatar Button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-700 hover:bg-blue-500 text-white"
          >
            {getUserInitial()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2 mt-4 mr-2 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="px-4 py-2">
            <p className="text-sm font-medium text-gray-900">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
          <ul className="space-y-1">
            <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <Button 
                variant="ghost" 
                className="w-full text-left text-sm font-normal text-black hover:bg-gray-100 hover:text-black"
                onClick={() => console.log("Manage profile clicked")}
              >
                Manage Profile
              </Button>
            </li>
            <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <Button 
                variant="ghost" 
                className="w-full text-left text-sm font-normal text-red-600 hover:bg-gray-100 hover:text-red-600"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}