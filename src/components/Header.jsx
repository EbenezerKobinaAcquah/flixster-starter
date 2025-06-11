export default function Header({ setSearchQuery, searchQuery, searchMoviesFromAPI }) {
    function handleSearchChange(e) {
        setSearchQuery(e.target.value);
    }

    function handleSearchButton() {
        searchMoviesFromAPI();
    }

    return (
        <>
            <header className="headerContainer">
                <h1>Flixster</h1>
                <div className="searchSort">
                    <div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e)}
                            placeholder="Search"
                            className="searchBox"
                        />
                        <button className="searchButton" onClick={handleSearchButton}>Search</button>
                    </div>
                    <select className="sort">
                        <option value="1">Sort by</option>
                        <option value="1">Name</option>
                        <option value="1">Vote</option>
                        <option value="1">Date</option>
                    </select>
                </div>
            </header>
        </>
    )
}
