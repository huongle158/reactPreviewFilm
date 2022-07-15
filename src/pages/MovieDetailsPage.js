import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr'
import MovieCard from '../components/movie/MovieCard';
import { apiKey, fetcher } from '../config'

export default function MovieDetailsPage() {
    const { movieId } = useParams()
    const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`, fetcher)

    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data


    return (
        <>
            <div className="py-10">

                <div className="w-full h-[600px] relative" >
                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                    <div className="w-full h-full bg-cover no-repeat" style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`
                    }}>
                    </div>
                </div>
                <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
                    <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="" className="w-full h-full object-cover rounded-xl" />
                </div>
                <h1 className="text-center text-4xl font-bold text-white mb-10">{title}</h1>
                {genres.length > 0 && <div className="flex items-center justify-center gap-x-5 mb-10">
                    {genres.map(item => (
                        <span className="py-2 px-4 border-primary text-primary border rounded" key={item.id}>{item.name}</span>
                    ))}
                </div>}
                <p className="text-center leading-relaxed max-w-[60] mx-auto mb-10">
                    {overview}
                </p>
                <MovieCredit />
                <MovieVideos />
                <MovieSimilar />
            </div>
        </>
    )
}
function MovieCredit() {
    // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
    const { movieId } = useParams()
    const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`, fetcher)


    if (!data) return null;
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;


    return (
        <div className="py-10">
            <h2 className="text-center text-3xl mb-10">Casts</h2>
            <div className="grid grid-cols-4 gap-5">
                {cast.slice(0, 4).map(item => (
                    <div className="cart-item" key={item.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${item.profile_path}`} className="w-full h-[350px] object-cover rounded-lg mb-3" alt="" />
                        <h3 className="text-xl font-medium text-center">{item.name}</h3>
                    </div>
                ))}

            </div>
        </div>
    )

}
function MovieVideos() {
    // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
    const { movieId } = useParams()
    const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`, fetcher)
    
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10">
            <div className="flex flex-col gap-10">
                {results.slice(0, 2).map(item => (
                    <div className="" key={item.id}>
                        <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">{item.name}</h3>
                        <div key={item.id} className="w-full aspect-video">
                            <iframe width="943" height="482" src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full object-fill"></iframe>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    )

}
function MovieSimilar() {
    const { movieId } = useParams()
    const { data, error } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US`, fetcher)
    console.log("~ data", data)
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10" >
            <h3 className="mb-10 text-3xl font-medium">Similar Movies</h3>
            <div className="movie-list">
                {/* grabCursor để có thể kéo */}
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    {results.length > 0 && results.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}