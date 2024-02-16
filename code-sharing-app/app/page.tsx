import Image from "next/image";

// import styles from "./page.module.css";
import background from "./images/Hero-Background-notecode.svg";
import noteCodeLogo from "./images/NoteCodeLogo.svg";
import { useSearchParams } from "next/navigation";
import Card from "./Card";
import { readFile } from "fs/promises";
import path from "path";

let defaultInitialCode = `<html>
<head>
  <title>HTML Sample</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style type="text/css">
    h1 {
      color: #CCA3A3;
    }
  </style>
  <script type="text/javascript">
    alert("I am a sample... visit devChallengs.io for more projects");
  </script>
</head>
<body>
  <h1>Heading No.1</h1>
  <input disabled type="button" value="Click me" />
</body>
</html>`;

function safeJoin(base: string, child: string) {
  let joined = path.join(base, child);
  if (!joined.startsWith(base + "/"))
    throw new Error("attempted directory traversal");
  return joined;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [_: string]: string };
}) {
  let snippetId = searchParams.id;
  let initialCode = snippetId
    ? (await readFile(safeJoin("snippets", snippetId))).toString()
    : defaultInitialCode;

  return (
    <main
      className={`column`}
      style={{
        backgroundImage:
          `url(${background.src}),` +
          `linear-gradient(to bottom right, #b787f5, #743ee4)`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        height: "100vh",
      }}
    >
      <Image style={{ margin: "32px" }} src={noteCodeLogo} alt="logo" />
      <h1 style={{ fontSize: "2rem" }}>Create & Share</h1>
      <h1 style={{ fontSize: "2.5rem" }}>Your Code easily</h1>
      <Card initialCode={initialCode} />
    </main>
  );
}
