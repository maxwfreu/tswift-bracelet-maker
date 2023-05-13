import { SequenceMatcher } from "./sequence";

const fs = require("fs").promises;
var path = require("path");

export default async function Home() {
  const getLyrics = async () => {
    // replace line breaks in inputD with spaces
    const configDirectory = path.resolve(process.cwd(), "config");
    let parsedLyrics = await fs.readFile(
      path.join(configDirectory, "lyrics.txt")
    );
    parsedLyrics = parsedLyrics.toString().replace(/\n/g, " ");

    // remove punctuation
    parsedLyrics = parsedLyrics.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    // remove extra spaces
    parsedLyrics = parsedLyrics.replace(/\s{2,}/g, " ");

    const lyrics = parsedLyrics.toString().split(" ");
    return lyrics as string[];
  };
  const lyrics = await getLyrics();

  // find all sequences of first letters of words that make a real english word
  const getWords = async () => {
    const configDirectory = path.resolve(process.cwd(), "config");
    let commonEnglishWords = await fs.readFile(
      path.join(configDirectory, "20k.txt")
    );
    commonEnglishWords = commonEnglishWords.toString().split("\n");
    return commonEnglishWords as string[];
  };
  const commonEnglishWords = await getWords();

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
      <h1 className="leading-8 text-3xl mb-12">
        Type in a sequence of letters to find matching Taylor Swift lyrics!
      </h1>
      <SequenceMatcher
        lyrics={lyrics}
        commonEnglishWords={commonEnglishWords}
      />
    </main>
  );
}
