import axios from "axios";
import { MovieItem } from "./definition";


function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export async function getRandomMovie(): Promise<MovieItem> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_API_KEY;
    const randomPage = getRandomInt(1, 100);

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/4/discover/movie",
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
    const response = await axios.request(options);

    const randomMovieIndex = getRandomInt(0, response.data.results.length - 1);
    const randomMovie = response.data.results[randomMovieIndex];

    return randomMovie;
  } catch (error) {
    console.error("hata", error);

    throw error;
  }
}

export async function getFeaturedMovie() {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_REACT_APP_API_KEY;

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/4/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    const response = await axios.request(options);

    const featuredMovie = response.data.results.slice(0,9);

    return featuredMovie;
  } catch (error) {
    console.error(error);

    throw error;
  }
}



