import piece from "./piece.js";

export default class bishop extends piece {
    constructor (position, team){
        super('fou', [1, 1], position, team);
        document.getElementById(position).addEventListener('click', this.select, true);
    }
}