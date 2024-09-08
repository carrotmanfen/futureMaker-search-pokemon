import React, { useState } from 'react'
import { FaSearch, FaHome } from "react-icons/fa";
const SearchInputComponent = ({haveHomeButton}: { haveHomeButton: boolean }) => {
    const [searchPokemon, setSearchPokemon] = useState('');
    const searchHandler = () => {
        if(searchPokemon.length > 0){
            window.location.href = `/pokemon?search=${searchPokemon}`
        }
    }
    return (
        <div className="flex flex-row items-center h-12 mt-2 mb-8 ">
            {haveHomeButton&&<button className="bg-white p-2 rounded-md mr-2 h-12 flex items-center justify-center text-black" onClick={() => {window.location.href = `/`}}>
                <FaHome />
            </button>}
            <input
                type="text"
                value={searchPokemon}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchPokemon(e.target.value)}
                placeholder="Search Pokémon"
                className="w-64 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 text-black"
            />
            <button className="bg-white p-2 rounded-md ml-2 h-12 flex items-center justify-center text-black" onClick={searchHandler}>
                <FaSearch />
            </button>
        </div>
    )
}

export default SearchInputComponent