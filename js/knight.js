import piece from "./piece.js";

export default class knight extends piece {
    constructor (position, team){
        super('cavalier', [1, 1], position, team);
        document.getElementById(position).addEventListener('click', this.select, true);
    }
}