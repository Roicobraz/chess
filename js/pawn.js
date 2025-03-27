import piece from "./piece.js";

export default class pawn extends piece {
    init_position;

    constructor (position, team){
        super('pion', [0, 1], position, team);
        this.init_position = this.position;
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
            if((this.team == 'white' && this.position.id.includes(8)) || (this.team == 'black' && this.position.id.includes(1)))
            {          
                window.alert('Faire modal pour changement de pièce');
            }
            else if(!is_selected)
            {
                this.position.classList.add('piece_selected');

                // position x des déplacement possible
                let x = String.fromCharCode(this.position.id[0].charCodeAt(0) + this.movement[0]);
                // position y des déplacement possible
                let move_y = parseInt(this.position.id[1])

                let y = (move_y + this.movement[1]).toString();
                let y2 = (move_y + 2).toString();

                if(this.team == "black" && this.position.classList.contains('black'))
                {
                    y = (move_y - this.movement[1]).toString()
                    y2 = (move_y - 2).toString();
                }

                // si le pion est sur sa position initiale il peut se déplacer de 2 cases
                if ((this.position.id == this.init_position.id) && 
                (!document.getElementById(x+y2).classList.contains(this.ennemy) && !document.getElementById(x+y2).classList.contains(this.team)))
                {
                    document.getElementById(x+y2).classList.add("selected");
                }

                if (!document.getElementById(x+y).classList.contains(this.ennemy) && !document.getElementById(x+y).classList.contains(this.team))
                {
                    // Ajout de la classe "selected" aux déplacement possible
                    document.getElementById(x+y).classList.add("selected");

                    let selected = document.getElementsByClassName("selected");
                    for (let movement_possible of selected)
                    {
                        movement_possible.addEventListener('click', this.move);
                    }
                }
                this.attack();
            }
        }  
    }

    /**
     * gestion de l'attaque avec la sélection des attaques possible
     */
    attack()
    {
        let possible_attack = [
            (String.fromCharCode(this.position.id[0].charCodeAt(0) + 1)) + (parseInt(this.position.id[1]) + 1),
            (String.fromCharCode(this.position.id[0].charCodeAt(0) - 1)) + (parseInt(this.position.id[1]) + 1),
        ];

        if(this.team == 'black')
        {
            possible_attack = [
                (String.fromCharCode(this.position.id[0].charCodeAt(0) + 1)) + (parseInt(this.position.id[1]) - 1),
                (String.fromCharCode(this.position.id[0].charCodeAt(0) - 1)) + (parseInt(this.position.id[1]) - 1),
            ];
        }
        
        possible_attack.forEach(element => {
            if(document.getElementById(element))
            {
                if (document.getElementById(element).classList.contains(this.ennemy))
                {
                    document.getElementById(element).classList.add('attack');
                    document.getElementById(element).addEventListener('click', this.move);
                }
            }
        });
    }
}