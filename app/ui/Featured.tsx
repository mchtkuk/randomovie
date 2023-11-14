import React, { FC } from "react";
import { FeaturedProps } from "../lib/interfaces";

const Featured: FC<FeaturedProps> = ({
  title,
  backdrop_path,
  vote_average,
}) => {
  const imageUrl = `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${backdrop_path}`;
  return (
    <div>
      <div className="flex flex-col items-center max-w-[288px] max-h-[52px] text-center gap-1 mb-2">
        <h4>{title}</h4>
        <h3>IMDB: {vote_average}</h3>
      </div>
      <div className="w-72 mt-9">
        <div
          className="min-h-[600px] bg-transparent bg-[url('https://image.tmdb.org/t/p/w370_and_h556_multi_faces/tM7uHa2Km5gSakooTQsZLwit3PK.jpg')] bg-cover text-gray-700 shadow-none"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Featured;
