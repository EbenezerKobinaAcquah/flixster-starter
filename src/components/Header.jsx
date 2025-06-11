export default function Header({ setSearchQuery, searchQuery, searchMoviesFromAPI }) {
    function handleSearchChange(e) {
        setSearchQuery(e.target.value);
    }

    function handleSearchButton() {
        searchMoviesFromAPI();
    }

    return (
        <>
            <header>
                <h1>Flixster</h1>
                <div className="searchSort">
                    <div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e)}
                            placeholder="Search"
                        />
                        <button onClick={handleSearchButton}>Search</button>
                    </div>
                    <select>
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
