import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { func } from 'prop-types';


function Banner() {

    const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=3169574fb77a6d947198c7fccc4bd031`, fetcher);
    const movies = data?.results || []



    return (
        <section className="banner h-[500px] page-container mb-20 overflow-hidden">
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {movies.length > 0 && movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <BannerItem item={item}/>
                    </SwiperSlide>
                ))}
                
            </Swiper>
        </section>
    )
}
function BannerItem({item}) {
    const { title, poster_path } = item;
    return (
        <div className="w-full h-full rounded-lg bg-white relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" className="w-full h-full object-contain object-top rounded-lg" />
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-3">Avenger Endgame</h2>
                <div className="flex items-center gap-x-3 mb-8">
                    <span className="py-2 px-4 border border-white rounded-md">Adventure</span>
                    <span className="py-2 px-4 border border-white rounded-md">Adventure</span>
                    <span className="py-2 px-4 border border-white rounded-md">Adventure</span>
                </div>
                <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">Watch Now</button>
            </div>
        </div>
    )
}

export default Banner;
