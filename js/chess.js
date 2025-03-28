// il manque le changement de pièce après avoir été au bout du plateau
import pawn from "./pawn.js";

// bug avec les potentielles déplacement
import rook from "./rook.js";
import knight from "./knight.js";
import bishop from "./bishop.js";
import king from "./king.js";
import queen from "./queen.js";

window.white_turn = true;
window.black_turn = false;

// registre des classes pour l'instanciation dynamique 
const classRegistry = {
    pawn: pawn,
    rook: rook,
    knight: knight,
    bishop: bishop,
    king: king,
    queen: queen,
};

function position_dyna(json)
{
    fetch(json)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  
    })
    .then(data => {  
        for (const [team, value] of Object.entries(data)) {
            for (const [piece, positions] of Object.entries(value)) {
                for (const [id, pos] of Object.entries(positions)) {
                    // instanciation dynamique des pièces
                    try {
                        if(pos.includes('is_dead'))
                        {
                            console.log('est mort');
                            let dead = document.getElementById(team + '_eaten');

                            let div = document.createElement("div");
                            div.id = pos;
                            dead.append(div); 
                        }
                        new classRegistry[piece](pos, team); 
                    } catch (error) {
                        console.error(`Failed: ${piece} with position ${pos}:`, error);
                    }
                }
            }
        }
    })  
    .catch(error => console.error('Failed to fetch data:', error)); 
}

position_dyna('./pos_init.json');