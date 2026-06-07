import React from "react";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <div>
    <Navbar />
    <main className="mx-auto max-w-[1600px] p-6 lg:pl-80">{children}</main>
  </div>
);

export default Layout;
