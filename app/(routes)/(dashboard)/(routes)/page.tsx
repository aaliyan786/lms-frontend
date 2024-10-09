'use client'
import { auth } from "@/app/_config/firebase/firebase-config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Home() {

  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    if (!user || error) {
      console.log(error);
      router.push('/sign-in');
    }
  }, [user, router, error]);

  if (!user || loading || error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner className="w-12 h-12" />
      </div>
    )
  }

  return (
    <div>    
      <p className="text-3xl font-medium text-sky-700">
        Press This To Log Out
      </p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
