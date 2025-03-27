import piece from "./piece.js";

export default class rook extends piece {
    constructor (position, team){
        super('tour', [1, 1], position, team);
        document.getElementById(position).addEventListener('click', this.select, true);
    }
}