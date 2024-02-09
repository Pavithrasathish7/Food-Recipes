import React from "react";
import classes from "./page.module.css";
import Link from "next/link";
import { getMeals } from "@/db/meals";
import { MealGrid } from "@/component/meal/meal-grid";

export default async function sharePage() {
  const meals = await getMeals();

  return (
    <>
      <header className={classes.header}>
        <h1>
          Deliouse Food created, {}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>choose ur fav food and cook yourself</p>
        <p className={classes.cta}>
          <Link href="/meals/share">share your recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealGrid meals={meals} />
      </main>
    </>
  );
}
