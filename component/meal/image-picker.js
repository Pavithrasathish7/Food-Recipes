"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ name, label }) {
  const [pickedimg, setPickedimg] = useState();
  const imageinput = useRef();

  function handleclick() {
    imageinput.current.click();
  }

  function imgpreview(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedimg(null);
      return;
    }
    const filereader = new FileReader();
    filereader.onload = () => {
      setPickedimg(filereader.result);
    };
    filereader.readAsDataURL(file);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.preview}>
        {!pickedimg && <p>no img selected</p>}
        {pickedimg && <Image src={pickedimg} alt="img" fill />}
      </div>
      <div className={classes.controls}>
        <input
          ref={imageinput}
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png,image/jpeg"
          onChange={imgpreview}
        />
        <button className={classes.button} type="button" onClick={handleclick}>
          pick an Iamge
        </button>
      </div>
    </div>
  );
}
