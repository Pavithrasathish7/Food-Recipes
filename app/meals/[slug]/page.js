import Image from "next/image";
import React from "react";
import classes from "./page.module.css";
import { getMeal } from "@/db/meals";
import { notFound } from "next/navigation";

export function generateMetadata({ params }) {
  const meal = getMeal(params.slug);
  return {
    title: meal.title,
    description: "hello",
  };
}

export default function MealDetails({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    notFound();
  }
  return (
    <>
      <header className={classes.header}>
        <div clssName={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.cretor_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
