import piece from "./piece.js";

export default class queen extends piece {
    constructor (position, team){
        super('reine', [1, 1], position, team);
        document.getElementById(position).addEventListener('click', this.select, true);
    }
}