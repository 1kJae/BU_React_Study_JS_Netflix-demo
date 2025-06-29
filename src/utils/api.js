import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: `application/json`,
        Authorization: `Bearer ${API_KEY}`
    },
});

export const fetchDiscoveredMovies = (
  page = 1,
  genres = [],
  sort = 'popularity.desc'
) => {
  const g = genres.length ? `&with_genres=${genres.join(',')}` : '';
  const v = sort.includes('vote_average') ? '&vote_count.gte=50' : '';
  return api.get(
    `/discover/movie?page=${page}${g}&sort_by=${sort}${v}&language=ko-KR`
  );
};

export default api;
