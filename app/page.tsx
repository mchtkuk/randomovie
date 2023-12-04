"use client";

import { getRandomMovie, getFeaturedMovie, getFeaturedTv } from "./lib/data";
import { useEffect, useState, useRef } from "react";
import { GenreIds, MovieItem, genresById } from "./lib/definition";
import MovieCard from "./ui/MovieCard";
import Featured from "./ui/Featured";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from 'swiper/modules';
import "swiper/swiper-bundle.css";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function Home() {
  const [randomMovie, setRandomMovie] = useState<MovieItem>();
  const [featuredMovie, setFeaturedMovie] = useState<MovieItem>();
  const [featuredTv, setFeaturedTv] = useState<MovieItem>();

  const handleGenerateMovie = () => {
    getRandomMovie().then((movie) => {
      setRandomMovie(movie);
    });
  };

  const featuredGenerateMovie = () => {
    getFeaturedMovie().then((featured) => {
      setFeaturedMovie(featured);
    });
  };

  const featuredGenerateTv = () => {
    getFeaturedTv().then((featured) => {
      setFeaturedTv(featured)
    })
  }

  useEffect(() => {
    handleGenerateMovie();
    featuredGenerateMovie();
    featuredGenerateTv();
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
      <section className="flex flex-row justify-center items-center mb-6 ">
        <Swiper
        slidesPerView={2}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1080: {
            slidesPerView: 3,
            spaceBetween: 10,
          }
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        >
          {featuredMovie &&
            featuredMovie.map((featured) => (
              <SwiperSlide key={featured.id}>
                <Featured
                  key={featured.id}
                  title={featured.title}
                  vote_average={featured.vote_average}
                  backdrop_path={featured.backdrop_path}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      <div className="text-center">
        <h2 className="font-bold text-3xl">Featured TV Series</h2>
      </div>
      <section className="flex flex-row justify-center items-center mb-6 ">
        <Swiper
        slidesPerView={2}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1080: {
            slidesPerView: 3,
            spaceBetween: 10,
          }
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        >
          {featuredTv &&
            featuredTv.map((featured) => (
              <SwiperSlide key={featured.id}>
                <Featured
                  key={featured.id}
                  title={featured.name}
                  vote_average={featured.vote_average.toFixed(1)}
                  backdrop_path={featured.backdrop_path}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </main>
  );
}
