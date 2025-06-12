import { useState, useEffect } from "react";

export default function Header({ movies, setMovies, handleSort, setSearchQuery, searchQuery, searchMoviesFromAPI, setActiveView }) {
    const [sort, setSort] = useState('name');
    function handleSearchChange(e) {
        setSearchQuery(e.target.value);
    }

    function handleSearchButton() {
        searchMoviesFromAPI();
    }
function handleclearButton() {
    setSearchQuery('');
    setActiveView("nowPlaying")

}

function handleEnterKey(e) {
    if (e.key === 'Enter') {
        searchMoviesFromAPI();
    }
}
let sortByMethod = "original_title.asc"
function methodOfSort(event){
    let sortedMovies = [...movies];
    if(event.target.value === 'Name'){
        sortedMovies.sort((a, b) => a.original_title.localeCompare(b.original_title));
        setMovies(sortedMovies);
        // setSort('Name')
    //     const value = e.target.value;
    // let sortedMovies = [...movies];

    // if (value === "name") {
    //   sortedMovies.sort((a, b) => a.name.localeCompare(b.name));
    // } else if (value === "votes") {
    //   sortedMovies.sort((a, b) => b.votes - a.votes);
    // }

    // setMovies(sortedMovies);

    }
    else if(event.target.value === 'Vote')
    {
        sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
        // setSort('Vote')
        setMovies(sortedMovies);
    }
    else{
        sortedMovies.sort((a, b) => b.release_date.localeCompare(a.release_date));
        setMovies(sortedMovies);
    }

}

// const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sortByMethod}`;
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2NiMDFlNTllNzNiYWQxOThlZDFiZWE1MmYzYzk1NiIsIm5iZiI6MTc0OTUwMjg0OS4xMzIsInN1YiI6IjY4NDc0YjgxNzIyNzZmYzczYmJiMzQ2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vkwzz0liYqij5GQ68Ehc5H26Sxqwq9ZZLqoVzR70oVk'
//   }
// };
// useEffect(() => {
//     const fetchSortedMovies = async () => {
//         const response = await fetch(url, options)
//         console.log("this is the response:", response);
//         const data = await response.json()
//     }
//     fetchSortedMovies()
// }, [sort])


    return (
        <>
            <header className="headerContainer">
                <h1>Flixster 🎥</h1>
                <div className="searchSort">
                    <div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e)}
                            placeholder="Search"
                            className="searchBox"
                            onKeyDown={(e) => {handleEnterKey(e)}}
                        />
                        <button className="searchButton" onClick={handleSearchButton}>Search</button>
                        <button className="clearButton" onClick={handleclearButton}>Clear</button>
                    </div>
                    <select className="sort" onChange={methodOfSort} value={sort}>
                        <option value="1" >Sort by</option>
                        <option value="Name">Name</option>
                        <option value="Vote">Vote</option>
                        <option value="Date">Date</option>
                    </select>
                </div>
            </header>
        </>
    )
}
