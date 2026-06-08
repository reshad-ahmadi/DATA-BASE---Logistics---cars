import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const isAuth = ["/login", "/signup"].includes(pathname);

  return (
    <div>
      {!isAuth && <Navbar />}
      <main className={isAuth ? "" : "mx-auto max-w-[1600px] p-6 lg:pl-80"}>{children}</main>
    </div>
  );
};

export default Layout;
