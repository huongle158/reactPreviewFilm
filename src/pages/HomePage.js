import React, { Fragment } from 'react'
import Banner from '../components/banner/Banner'
import Header from '../components/layout/Header'
import MovieList from '../components/movie/MovieList'

export default function HomePage() {
    return (
        <Fragment>
            <Banner />
            <section className="movies-layout page-container pb-20">
                <h2 className="capitalize text-white mb-10 text-3xl font-bold">Now playing</h2>
                <MovieList />
            </section>
            {/* Top rated */}
            <section className="movies-layout page-container pb-20">
                <h2 className="capitalize text-white mb-10 text-3xl font-bold">Top Rated</h2>
                <MovieList type="top_rated"/>
            </section>
            {/* Trending */}
            <section className="movies-layout page-container pb-20">
                <h2 className="capitalize text-white mb-10 text-3xl font-bold">Trending</h2>
                <MovieList type="popular" />
            </section>
        </Fragment>
    )
}

