"use client";
import { useFormStatus } from "react-dom";

export default function SubmitForm() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "submitting..." : "share meal"}
    </button>
  );
}
