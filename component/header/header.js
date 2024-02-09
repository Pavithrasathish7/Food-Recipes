"use client";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import classes from "./header.module.css";
import Image from "next/image";
import Headerbackg from "./header-backg";
import { usePathname } from "next/navigation";
import { Navlink } from "./nav";

function Header() {
  const path = usePathname();
  return (
    <>
      <Headerbackg />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logo} alt="page log" priority />
          Food Court
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Navlink href="/meals">Meals </Navlink>
            </li>
            <li>
              <Navlink href="/comunity">Foodie Comunity</Navlink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
