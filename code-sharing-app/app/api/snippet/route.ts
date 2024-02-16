import { writeFile } from "fs/promises";

export async function POST(request: Request) {
  let filename = new Date().toISOString();
  writeFile(`snippets/${filename}`, await request.text());

  return Response.json({
    url: `localhost:3000?id=${filename}`,
    display: `...${filename}`,
  });
}
