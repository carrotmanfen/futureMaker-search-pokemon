"use client";
import client from '@/lib/apollo-client';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { GET_POKEMON } from "../../lib/queries";
import SearchInputComponent from '@/components/searchInputComponent';
import React from 'react';

interface Attack {
    name: string;
    type: string;
    damage: number;
}

interface Evolution {
    id: string;
    number: string;
    name: string;
    classification: string;
    types: string[];
    resistant: string[];
    weaknesses: string[];
    fleeRate: number;
    maxCP: number;
    maxHP: number;
    image: string;
}

const PokemonPage: React.FC = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('search') || ' ';

    const { loading, error, data } = useQuery(GET_POKEMON, {
        variables: { name: name },
        client
    });
    if (error) return <p>Error: {error.message}</p>;
    
    return (
        <div className='text-white flex flex-col w-full justify-center items-center'>
            <h1 className="text-4xl text-white mt-8">Pokémon</h1>
            <SearchInputComponent haveHomeButton={true} />
            {data && data.pokemon != null && <div className='flex flex-col justify-center'>
                <h1 className='text-center text-3xl mb-2'>No.{data.pokemon.number}</h1>
                <h1 className='text-center text-4xl mb-2'>{data.pokemon.name}</h1>
                <div className='bg-white text-black text-xl py-4 px-16 rounded-xl'>
                    <img src={data.pokemon.image} alt={data.pokemon.name} className='mb-8' />
                    <p>Types: {data.pokemon.types.join(', ')}</p>
                    <p>Weaknesses: {data.pokemon.weaknesses.join(', ')}</p>
                    <p>fleeRate: {data.pokemon.fleeRate}</p>
                    <p>maxCP: {data.pokemon.maxCP}</p>
                    <p>maxHP: {data.pokemon.maxHP}</p>
                    <p>Weight: {data.pokemon.weight.minimum} - {data.pokemon.weight.maximum}</p>
                    <p>Height: {data.pokemon.height.minimum} - {data.pokemon.height.maximum}</p>
                    <h2 className=''>Fast Attacks</h2>
                    <ul>
                        {data.pokemon.attacks.fast.map((attack: Attack, index: number) => (
                            <li key={index} className='ml-4'>
                                - {attack.name} ({attack.type}) - {attack.damage} damage
                            </li>
                        ))}
                    </ul>

                    <h2 className=''>Special Attacks</h2>
                    <ul>
                        {data.pokemon.attacks.special.map((attack: Attack, index: number) => (
                            <li key={index} className='ml-4'>
                                - {attack.name} ({attack.type}) - {attack.damage} damage
                            </li>
                        ))}
                    </ul>
                </div>

                <h2 className='text-center text-3xl mt-16 mb-8'>Evolutions</h2>
                <ul>
                    {data.pokemon.evolutions != null ? data.pokemon.evolutions.map((evolution: Evolution) => (
                        <li key={evolution.id} className='bg-white text-black text-xl text-center py-4 px-16 mb-8 rounded-xl hover:cursor-pointer transform transition-transform duration-300 hover:scale-110' onClick={() => { window.location.href = `/pokemon?search=${evolution.name}` }}>
                            <p>No.{evolution.number} {evolution.name}</p>
                            <p>Classification: {evolution.classification}</p>
                            <img src={evolution.image} alt={evolution.name} className=' mt-8' />
                        </li>
                    )) : <p className='p-4 bg-white text-black rounded-xl'>No evolutions</p>}
                </ul>
            </div>}
            {data && data.pokemon == null && <p>Pokémon {name} not found</p>}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default PokemonPage;