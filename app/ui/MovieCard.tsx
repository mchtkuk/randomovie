import { FC } from "react";
import { MovieCardProps } from "../lib/interfaces";

const MovieCard: FC<MovieCardProps> = ({
  title,
  overview,
  genre_ids,
  vote_average,
  backdrop_path,
  release_date,
  popularity,
  original_language
}) => {
  const imageUrl = `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${backdrop_path}`;

  return (
    <div className="flex flex-row overflow-hidden first-line:bg-clip-border mt-32  text-gray-700">
      <div className="flex w-1/4 border-gray-800 border-[12px]">
        <div
          className="inset-0 m-0 min-h-[600px] w-full bg-transparent bg-[url('https://image.tmdb.org/t/p/w370_and_h556_multi_faces/tM7uHa2Km5gSakooTQsZLwit3PK.jpg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="relative w-3/4 px-6 gap-5 flex flex-col md:px-12">
        <h1 className="mb-2 font-bold text-6xl text-white antialiased ">
          {title}
        </h1>
        <h3 className="text-2xl font-bold text-white">Release Date: {release_date.split('-').reverse().join('-')}</h3>
        <div className="flex gap-3 text-white mb-4 font-bold text-xl antialiased  leading-snug tracking-normal button">
          {genre_ids.split(" ").map(genres => (
            <h5 className="border bg-transparent text-white font-bold p-2 pointer-events-none" key={genres}>{genres}</h5>
          ))}
        </div>
        <h5 className="text-white font-bold text-3xl">
          IMDB: {vote_average}
        </h5>
        <div className="gap-4 flex flex-col">
          <div className="border-b-2 border-spacing-5 w-fit py-2 border-[#6ADBE9]">
            <h1 className=" font-bold text-2xl text-[#6ADBE9]">Storyline</h1>
          </div>
          <p className="text-white">{overview}</p>
          <p className="text-gray-400">Popularity: {popularity.toFixed(0)}%</p>
          <p className="text-gray-400">Original Language: {original_language.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
