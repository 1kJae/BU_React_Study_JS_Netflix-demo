import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovie = ({ keyword = "", page }) => {
    return keyword
    ? api.get(`/search/movie?query=${encodeURIComponent(keyword)}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`);
}

export const useSearchMovieQuery = ({keyword, page}) => {
    return useQuery({
        queryKey: ['movie-search', {keyword, page}],
        queryFn: () => fetchSearchMovie({keyword, page}),
        suspense: true,
        select: (result) => result.data,
    })
}