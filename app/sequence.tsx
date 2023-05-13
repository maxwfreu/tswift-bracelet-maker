"use client";

import { FormEventHandler, useState } from "react";

export const SequenceMatcher = ({
  lyrics,
  commonEnglishWords,
}: {
  lyrics: string[];
  commonEnglishWords: string[];
}) => {
  const [matched, setMatched] = useState<string[][]>([]);
  const [didSearch, setDidSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const getSequence = async (word: string) => {
    if (!word) {
      return [];
    }
    setDidSearch(true);
    let index = 0;
    let words = [];
    const foundWords = [];
    for (let i = 0; i < lyrics.length; i++) {
      if (!lyrics[i] || !lyrics[i][0]) {
        continue;
      }
      if (lyrics[i][0].toLowerCase() === word[index].toLowerCase()) {
        words.push(lyrics[i]);
        index++;
      } else {
        index = 0;
        words = [];
      }
      if (words.length === word.length) {
        foundWords.push(words);
        index = 0;
        words = [];
      }
    }

    const uniqueWords = [];
    for (let i = 0; i < foundWords.length; i++) {
      const words = foundWords[i];
      let isUnique = true;
      for (let j = 0; j < uniqueWords.length; j++) {
        const unique = uniqueWords[j];
        if (unique.join("").toLowerCase() === words.join("").toLowerCase()) {
          isUnique = false;
          break;
        }
      }
      if (isUnique) {
        uniqueWords.push(words);
      }
    }
    return uniqueWords;
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const words = await getSequence(searchTerm);
    setMatched(words);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="border rounded-sm p-2 w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="border rounded-md px-2 py-4 mt-2">
          Find Matching Lyrics!
        </button>
        <button>Find a random word</button>
      </form>
      {matched.length > 0 && (
        <div>
          <h2 className="mt-4 text-xl">Matched Lyrics</h2>
          <ul>
            {matched.map((words, i) => (
              <li key={words.join("") + i}>{words.join(" ")}</li>
            ))}
          </ul>
        </div>
      )}
      {matched.length === 0 && didSearch && (
        <div>
          <h2 className="mt-4 text-xl">No Matched Lyrics</h2>
        </div>
      )}
    </div>
  );
};
