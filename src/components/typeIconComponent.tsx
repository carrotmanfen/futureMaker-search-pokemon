import React from "react";

interface TypeIconProps {
    type: string; // Type of the Pokémon, e.g., 'fire', 'water', etc.
}

const typeImages: Record<string, string> = {
    Bug: "/icons/Bug_icon.png",
    Dark: "/icons/Dark_icon.png",
    Dragon: "/icons/Dragon_icon.png",
    Electric: "/icons/Electric_icon.png",
    Fairy: "/icons/Fairy_icon.png",
    Fighting: "/icons/Fighting_icon.png",
    Flying: "/icons/Flying_icon.png",
    Fire: "/icons/Fire_icon.png",
    Ghost: "/icons/Ghost_icon.png",
    Grass: "/icons/Grass_icon.png",
    Ground: "/icons/Ground_icon.png",
    Ice: "/icons/Ice_icon.png",
    Normal: "/icons/Normal_icon.png",
    Poison: "/icons/Poison_icon.png",
    Psychic: "/icons/Psychic_icon.png",
    Rock: "/icons/Rock_icon.png",
    Steel: "/icons/Steel_icon.png",
    Water: "/icons/Water_icon.png",
};

const TypeIcon: React.FC<TypeIconProps> = ({ type }): React.ReactNode => {
    const imageSrc = typeImages[type] || "/icons/default.png"; // Fallback image if type not found

    return (
        <img
            src={imageSrc}
            alt={`${type} icon`}
            width={24}
            className="w-8 h-8 object-contain" // Adjust size as needed
        />
    );
};

export default TypeIcon;