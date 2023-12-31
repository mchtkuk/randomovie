"use client";

import { getRandomMovie, getFeaturedMovie, getFeaturedTv } from "./lib/data";
import { useEffect, useState, useRef } from "react";
import { GenreIds, MovieItem, genresById } from "./lib/definition";
import MovieCard from "./ui/MovieCard";
import Featured from "./ui/Featured";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { ThreeDots } from 'react-loading-icons'
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Home() {
  const [randomMovie, setRandomMovie] = useState<MovieItem>();
  const [featuredMovie, setFeaturedMovie] = useState<MovieItem>();
  const [featuredTv, setFeaturedTv] = useState<MovieItem>();
  const [loading, setLoading] = useState(false);

  const handleGenerateMovie = () => {
    setLoading(true);
    getRandomMovie().then((movie) => {
      setRandomMovie(movie);
      setLoading(false);
    });
  };

  async function FetchData() {
    await getRandomMovie().then((movie) => {
      setRandomMovie(movie);
      setLoading(false);
    });
    getFeaturedMovie().then((featured) => {
      setFeaturedMovie(featured);
    });
    getFeaturedTv().then((featured) => {
      setFeaturedTv(featured);
    });
  }

  useEffect(() => {
    FetchData()
  }, []);

  const mapGenreIdsToNames = (genreIds: GenreIds[]): string[] => {
    return genreIds.map((id) => genresById[id]);
  };

  const genre_ids = randomMovie ? randomMovie.genre_ids : [];
  const genreNames = mapGenreIdsToNames(genre_ids);

  return (
    <main className="flex min-h-screen flex-col gap-5 backdrop-grayscale-[50%] backdrop-blur-sm">
      <header className="flex relative p-8 justify-center w-full border-b-[2px] border-gray-500">
        <button
          onClick={handleGenerateMovie}
          className="font-bold text-4xl hover:text-[#6ADBE9] text-center"
        >
          RandoMovie
        </button>
      </header>
      <section className="w-full relative flex justify-center min-h-screen items-center">
        {loading ? (
          <ThreeDots />
        ) : (
          randomMovie && (
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
          )
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
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1080: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
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
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1080: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
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
