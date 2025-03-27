import pawn from "./pawn.js";

window.white_turn = true;
window.black_turn = false;

for (let i = "A".charCodeAt(0); i <= "H".charCodeAt(0); i++) {
    // pion blanc
    new pawn(String.fromCharCode(i)+"2", 'white');

    // pion noir
    new pawn(String.fromCharCode(i)+"7", 'black');
}