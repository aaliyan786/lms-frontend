'use client'
import { AuthGuard } from "@/app/_middleware/auth-guard";

// A layout component that wraps around your app's pages
const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <AuthGuard>
        <div>
            {children}
        </div>
    </AuthGuard>
  );
};

export default Layout;
