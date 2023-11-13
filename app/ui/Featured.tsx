import React, { FC } from "react";
import { FeaturedProps} from "../lib/interfaces";

const Featured: FC<FeaturedProps> = ({
  title,
  backdrop_path,
  vote_average,
}) => {
  const imageUrl = `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${backdrop_path}`;
  return (
    <div>
      <div>
        <h1>Featured Movies</h1>
      </div>
      {/* <div className="border bg-red" style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}> */}
        <div>
          <h2>{title}</h2>
        </div>
      </div>
  );
};

export default Featured;
