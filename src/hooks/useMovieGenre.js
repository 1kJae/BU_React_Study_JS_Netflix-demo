import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchMovieGenre = () => {
    return api.get(`/genre/movie/list`);
}

export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey:[`movie-genre`],
        queryFn: fetchMovieGenre,
        select: (result) => result.data.genres,
        suspense: true,
        staleTime: 300000,
    });
};