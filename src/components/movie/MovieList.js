import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from './MovieCard';
import useSWR from 'swr'
import { fetcher } from '../../config';


// https://api.themoviedb.org/3/movie/550?api_key=3169574fb77a6d947198c7fccc4bd031

export default function MovieList({type='now_playing'}) {
    // const [movies, setMovies] = useState([]);
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/${type}?api_key=3169574fb77a6d947198c7fccc4bd031`, fetcher)
    const movies = data?.results || []

    // useEffect(() => {
    //     if (data && data.results) {

    //         setMovies(data.results)
    //     }
    // }, [data])

    // console.log(movies)

    return (
        <div className="movie-list">
            {/* grabCursor để có thể kéo */}
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {movies.length > 0 && movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
