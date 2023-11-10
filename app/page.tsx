"use client";

import getRandomMovie from "./lib/data";
import { useState } from "react";
import { GenreIds, MovieItem, genresById } from "./lib/definition";
import MovieCard from "./ui/MovieCard";

export default function Home() {
  const [randomMovie, setRandomMovie] = useState<MovieItem>();

  const handleGenerateMovie = () => {
    getRandomMovie().then((movie) => {
      console.log(movie);
      setRandomMovie(movie);
    });
  };

  const mapGenreIdsToNames = (genreIds: GenreIds[]): string[] => {
    return genreIds.map((id) => genresById[id]);
  };

  const genre_ids = randomMovie ? randomMovie.genre_ids : [];
  const genreNames = mapGenreIdsToNames(genre_ids);

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 backdrop-blur-sm">
      <header className="flex p-8 w-1/2 justify-center items-center">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <h1 className="font-bold text-4xl text-center flex-1">RandoMovie</h1>
        <button className="bg-white hover:bg-blue-100 text-black font-bold py-2 px-4 rounded">
          Sign in
        </button>
      </header>
      <section className="flex flex-col gap-5 mt-10 items-center">
        <div className="flex flex-col text-center gap-2 justify-center">
          <h2 className="font-bold text-3xl">Cant decide to choose a movie,</h2>
          <h3 className="font-bold text-2xl">
            Press the button and generate a random movie ticket.
          </h3>
        </div>
        <button
          onClick={handleGenerateMovie}
          className="bg-white hover:bg-blue-100 text-black font-bold py-2 px-4 w-1/2 rounded"
        >
          Generate Movie
        </button>
      </section>
      <section>
        {randomMovie && (
          <MovieCard
            title={randomMovie.title}
            overview={randomMovie.overview}
            genre_ids={genreNames.join(", ")}
            vote_average={randomMovie.vote_average}
            backdrop_path={randomMovie.backdrop_path}

          />
        )}
      </section>
    </main>
  );
}
