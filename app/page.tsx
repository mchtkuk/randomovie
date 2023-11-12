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
    <main className="flex min-h-screen flex-col gap-5 backdrop-grayscale-[50%] backdrop-blur-sm">
      <header className="flex relative p-8 justify-between w-full border-b-[2px] border-gray-500">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 hover:text-[#6ADBE9]"
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
        <button  onClick={handleGenerateMovie} className="font-bold text-4xl hover:text-[#6ADBE9] text-center">RandoMovie</button>
        <button className="text-white font-bold hover:text-[#6ADBE9]">
          Sign in
        </button>
      </header>
      <section className="w-full relative flex justify-center items-center">
        {randomMovie && (
          <MovieCard
            title={randomMovie.title}
            overview={randomMovie.overview}
            genre_ids={genreNames.join(" ")}
            vote_average={randomMovie.vote_average}
            backdrop_path={randomMovie.backdrop_path}
            release_date={randomMovie.release_date}
            original_language= {randomMovie.original_language}
            popularity = {randomMovie.popularity}
            onClick= {handleGenerateMovie}
          />
        )}
      </section>
    </main>
  );
}
