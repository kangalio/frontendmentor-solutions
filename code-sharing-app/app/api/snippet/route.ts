import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  let directory = "snippets";
  let filename = new Date().toISOString();

  mkdir(directory, { recursive: true });
  writeFile(path.join(directory, filename), await request.text());

  return Response.json({
    url: `${request.headers.get("Host") ?? "localhost:3000"}?id=${filename}`,
    display: `...${filename}`,
  });
}
