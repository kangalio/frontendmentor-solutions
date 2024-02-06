import "./page.css";
import CommentSection from "./CommentSection";

import { Rubik } from "next/font/google";

const font = Rubik({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export default function Page() {
  return (
    <main className={font.className}>
      <CommentSection />
    </main>
  );
}
