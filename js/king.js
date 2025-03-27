import piece from "./piece.js";

export default class king extends piece {
    constructor (position, team){
        super('roi', [1, 1], position, team);
        document.getElementById(position).addEventListener('click', this.select, true);
    }
}