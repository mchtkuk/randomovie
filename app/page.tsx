"use client";

import { getRandomMovie, getFeaturedMovie } from "./lib/data";
import { useEffect, useState } from "react";
import { GenreIds, MovieItem, genresById } from "./lib/definition";
import MovieCard from "./ui/MovieCard";
import Featured from "./ui/Featured";

export default function Home() {
  const [randomMovie, setRandomMovie] = useState<MovieItem>();
  const [featuredMovie, setFeaturedMovie] = useState<MovieItem>();

  const handleGenerateMovie = () => {
    getRandomMovie().then((movie) => {
      setRandomMovie(movie);
    });
  };

  const featuredGenerateMovie = () => {
    getFeaturedMovie().then((featured) => {
      console.log(featured);
      setFeaturedMovie(featured);
    });
  };

  useEffect(() => {
    handleGenerateMovie();
    featuredGenerateMovie();
  }, []);

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
        <button
          onClick={handleGenerateMovie}
          className="font-bold text-4xl hover:text-[#6ADBE9] text-center"
        >
          RandoMovie
        </button>
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
            original_language={randomMovie.original_language}
            popularity={randomMovie.popularity}
            onClick={handleGenerateMovie}
          />
        )}
      </section>
      <div className="text-center">
          <h2 className="font-bold text-3xl">Featured Movies</h2>
        </div>
      <section className="flex flex-row mb-10 justify-center">
        {featuredMovie && featuredMovie.map((featured) => (
          <Featured
            key={featured.id}
            title={featured.title}
            vote_average={featured.vote_average}
            backdrop_path={featured.backdrop_path}
          />
        )) 
        }
      </section>
    </main>
  );
}
