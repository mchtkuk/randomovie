import { MovieItem } from "../lib/definition";


const MovieCard = ({ title, overview, genre_ids, vote_average, backdrop_path }: MovieItem) => {

  const imageUrl = `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${backdrop_path}`;

  return (
    <div className="relative grid h-[32rem] w-full max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
      <div
        className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://image.tmdb.org/t/p/w370_and_h556_multi_faces/tM7uHa2Km5gSakooTQsZLwit3PK.jpg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50 backdrop-blur-[1px]"></div>
      </div>
      <div className="relative p-6 px-6 py-14 md:px-12">
        <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased ">
          {title}
        </h2>
        <h4 className="block text-white mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
          {genre_ids}
        </h4>
        <h5 className="text-white font-bold line-clamp-2">IMDB: {vote_average}</h5>
        <div className= "overflow-scroll min-h-full mt-1">
          <p style={{overflow: "scroll", height: "15rem"}} className="text-white">{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
