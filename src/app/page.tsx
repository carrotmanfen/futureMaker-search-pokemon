"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../lib/queries";
import client from "../lib/apollo-client";
import TypeIcon from "@/components/typeIconComponent";
import SearchInputComponent from "@/components/searchInputComponent";

const Home: React.FC = () => {
    const [pokemonCount, setPokemonCount] = useState(12);
    const [pokemons, setPokemons] = useState<any[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
        variables: { first: pokemonCount },
        client,
        onCompleted: (data) => {
            setPokemons(data.pokemons);
        },
    });

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        fetchMore({
            variables: { first: pokemonCount + 12 },
        }).then((fetchMoreResult) => {
            setPokemonCount(pokemonCount + 12);
            setPokemons(fetchMoreResult.data.pokemons);
            setIsLoadingMore(false);
        });
    };

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="flex flex-col items-center h-full w-screen">
            <h1 className="text-4xl text-white mt-8">Pokémon</h1>
            <SearchInputComponent haveHomeButton={false}/>
            {data != null && <div className="grid grid-cols-6 gap-8 items-stretch w-full p-4">
                {pokemons.map((pokemon: any) => (
                    <div
                        className="flex flex-col items-center justify-between h-full p-4 bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
                        key={pokemon.number}
                        onClick={() => {window.location.href = `/pokemon?search=${pokemon.name}`}}
                    >
                        <p className="text-lg text-center font-bold">No.{pokemon.number}</p>
                        <p className="text-lg text-center font-bold">{pokemon.name}</p>
                        <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            className="w-32 h-32 object-contain my-2"
                        />
                        <p className="text-sm text-gray-600">{pokemon.classification}</p>

                        {pokemon.types.map((type: string) => (
                            <div className="flex flex-row bg-slate-400 mt-2 pr-2 rounded-md" key={type}>
                                <p className="text-xs text-white rounded-md px-2 py-1 my-1">
                                    {type}
                                </p>
                                <TypeIcon type={type} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>}
            {!loading && !isLoadingMore &&
                <button className="bg-white p-2 rounded-md my-4" onClick={handleLoadMore}>
                    Load More
                </button>
            }
            {
                (loading || isLoadingMore) && <p className="text-white my-4">Loading...</p>
            }
        </div>
    );
};

export default Home;