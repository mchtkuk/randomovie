import React, { FC } from "react";
import { FeaturedProps } from "../lib/interfaces";
import Image from "next/image";

const Featured: FC<FeaturedProps> = ({
  title,
  backdrop_path,
  vote_average,
}) => {
  const imageUrl = `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${backdrop_path}`;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-9 w-96">
        <div
          className="min-h-[600px] rounded bg-transparent bg-[url('https://image.tmdb.org/t/p/w370_and_h556_multi_faces/tM7uHa2Km5gSakooTQsZLwit3PK.jpg')] bg-cover text-gray-700 shadow-none"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute float-left bg-gradient-to-r from-black w-96 font-bold bottom-8 p-3">
          <h3>{title}</h3>
          <h4>IMDB: {vote_average}</h4>
        </div>
      </div>
    </div>
  );
};

export default Featured;
