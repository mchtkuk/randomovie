import axios from "axios";
import { MovieItem } from "./definition";

async function getRandomMovie(): Promise<MovieItem> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_API_KEY;
    const randomPage = getRandomInt(1, 100);

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: randomPage,
        sort_by: "popularity.desc",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

      console.log(options)
    const response = await axios.request(options);

    const randomMovieIndex = getRandomInt(0, response.data.results.length - 1);
    const randomMovie = response.data.results[randomMovieIndex];

    return randomMovie;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomMovie;
