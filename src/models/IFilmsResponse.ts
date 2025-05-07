export interface Casts {
  id: string;
  movie_id: number;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string;
  character: string;
  created_at?: any;
  updated_at?: any;
}

export interface Data {
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
  created_at?: any;
  updated_at?: any;
  casts: Casts[];
}

export interface IFilmsResponse {
  data: Data[];
  path: string;
  per_page: number;
  next_cursor: string;
  next_page_url: string;
  prev_cursor?: any;
  prev_page_url?: any;
}