export interface Casts {
  id: string;
  movie_id: number;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string;
  character: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface IFilm {
  id: string;
  movie_id: number;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: number;
  created_at?: string | null;
  updated_at?: string | null;
  casts: Casts[];
}