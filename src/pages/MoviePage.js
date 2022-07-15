import React, { useEffect, useState } from 'react'
import MovieList from '../components/movie/MovieList'
import useSWR from 'swr'
import { fetcher } from '../config'
import MovieCard from '../components/movie/MovieCard'
import useDebounce from '../hooks/useDebounce'

const pageCount = 5;

export default function MoviePage() {
  // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
  // Tạo state lưu trữ input
  const [nextPage, setNextPage] = useState(1)
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 500);
  // Khi serach bản chta61 thay đường dẫn popular
  const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=3169574fb77a6d947198c7fccc4bd031&page=${nextPage}`)

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }
  const { data, error } = useSWR(url, fetcher)
  // Tức là nếu ko có data và ko có lỗi thì ta sẽ cho loading
  const loading = !data && !error
  // Khi gái trị thay đổi
  useEffect(() => {
    if (filterDebounce) {
      setUrl(`https://api.themoviedb.org/3/search/movie?api_key=3169574fb77a6d947198c7fccc4bd031&query=${filterDebounce}&page=${nextPage}`)
    } else {
      setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=3169574fb77a6d947198c7fccc4bd031&page=${nextPage}`)
    }
  }, [filterDebounce, nextPage])
  // if (!data) return null;
  const movies = data?.results || []
  // const {page,total_pages}=data;
  // console.log("~ total_pages", total_pages)
  // console.log("~ page", page)

  return (
    <div className="py-10 page-container">
      {/* Search */}
      <div className="flex mb-10">
        <div className="flex-1">
          <input onChange={handleFilterChange} type="text" className="text-white w-full p-4 bg-slate-800 outline-none" placeholder="Type here to search" />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      {loading && <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>}
      <div className="grid grid-cols-4 gap-10">
        {!loading && movies.length > 0 && movies.map(item => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
      {/* Phân trang */}
      <div className="flex items-center justify-center mt-10 gap-x-5">
        <span className="cursor-pointer" onClick={() => setNextPage(nextPage - 1)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </span>
        {new Array(pageCount).fill(0).map((item, index) => (
          <span key={index} onClick={()=>setNextPage(index+1)} className="cursor-pointer inline-block py-2 px-3 rounded leading-none bg-white text-slate-900">
            {index + 1}
          </span>
        ))}
        <span className="cursor-pointer" onClick={()=>setNextPage(nextPage+1)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  )
}

