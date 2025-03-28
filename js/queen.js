import piece from "./piece.js";

export default class queen extends piece {
    constructor (position, team){
        super('reine', [-1, 0, 1], position, team);
        document.getElementById(position).addEventListener('click', this.select, true);
    }

    /**
     * gestion du tour par tour,
     * de la sélection des coups possible
     */
    select = () => {
        if((this.team == 'white' && window.white_turn && this.position.classList.contains('white')) || (this.team == 'black' && window.black_turn && this.position.classList.contains('black')))
        {       
            let is_selected = false;
            if(this.position.classList.contains('piece_selected'))
            {
                is_selected = true;
            }
            this.deselection();
            
            // changement de pièces
            if(!is_selected)
            {
                this.position.classList.add('piece_selected');
                this.movement.forEach(x_tmp => {
                    this.movement.forEach(y_tmp => {
                        for (let j = 1; j <= 8; j++) 
                        {
                            let move_y = x_tmp*j;
                            let move_x = y_tmp*j;
                                                
                            // position x des déplacement possible
                            let x = String.fromCharCode(this.position.id[0].charCodeAt(0) + move_x);
                            // position y des déplacement possible
                            let y = (parseInt(this.position.id[1]) + move_y).toString();

                            if(x <= 'H' && y <= 8 && x >= 'A' && y >= 1)
                            {
                                if(document.getElementById(x+y))
                                {
                                    if(document.getElementById(x+y).classList.contains(this.team))
                                    {
                                        break;
                                    }
                                    else if(document.getElementById(x+y).classList.contains(this.ennemy))
                                    {
                                        document.getElementById(x+y).classList.add('attack');
                                        document.getElementById(x+y).addEventListener('click', this.move);
                                        break;
                                    }
                                    else
                                    {
                                        // Ajout de la classe "selected" aux déplacement possible
                                        document.getElementById(x+y).classList.add("selected");

                                        let selected = document.getElementsByClassName("selected");
                                        for (let movement_possible of selected)
                                        {
                                            movement_possible.addEventListener('click', this.move);
                                        }
                                    }
                                }
                            }
                        }
                    });
                });
            }
        }  
    }
}