import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug=?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instruction);

  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedimg = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedimg), (error) => {
    if (error) {
      throw new Error("oru img kuta sathipannuthu");
    }
  });

  meal.image = `/images/${filename}`;

  db.prepare(
    `
    INSERT INTO meals
    (title,summary,instructions,creator,creator_email,image,slug)
      VALUES (
  @title,
  @summary,
  @instructions,
  @creator,
  @creator_email,
  @image,
  @slug
   )

    `
  ).run(meal);
}
