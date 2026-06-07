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
    <div className="">
      {!isAuth && <Navbar />}
      <main className={isAuth ? "" : "p-6 max-w-[1600px] mx-auto lg:pl-80"}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
