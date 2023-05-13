import { SequenceMatcher } from "./sequence";

const fs = require("fs").promises;
var path = require("path");

export default async function Home() {
  const getLyrics = async () => {
    // replace line breaks in inputD with spaces
    const configDirectory = path.resolve(process.cwd(), "config");
    let inputD = await fs.readFile(path.join(configDirectory, "lyrics.txt"));
    inputD = inputD.toString().replace(/\n/g, " ");

    // remove punctuation
    inputD = inputD.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    // remove extra spaces
    inputD = inputD.replace(/\s{2,}/g, " ");

    const lyrics = inputD.toString().split(" ");
    return lyrics;
  };
  const lyrics = await getLyrics();

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
      <h1 className="leading-8 text-3xl mb-12">
        Type in a sequence of letters to find matching Taylor Swift lyrics!
      </h1>
      <SequenceMatcher lyrics={lyrics} />
    </main>
  );
}
