import piece from "./piece.js";

export default class pawn extends piece {
    init_position;

    constructor (position, team){
        super('pion', [0, 1], position, team);
        this.init_position = this.position;
        this.position.addEventListener('click', this.select);
    }

    /**
     * 
     */
    select = () => {
        this.deselection();

        if((this.team == 'white' && this.position.id.includes(8)) || (this.team == 'black' && this.position.id.includes(1)))
        {          
            window.alert('Faire modal pour changement de pièce');
        }
        else
        {
            // position x des déplacement possible
            let x = String.fromCharCode(this.position.id[0].charCodeAt(0) + this.movement[0]);

            // si le pion est sur sa position initiale il peut se déplacer de 2 cases
            if (this.position == this.init_position)
            {
                let y = (parseInt(this.position.id[1]) + 2).toString();
                document.getElementById(x+y).classList.toggle("selected");
            }

            // position y des déplacement possible
            let y = (parseInt(this.position.id[1]) + this.movement[1]).toString();

            if (!document.getElementById(x+y).classList.contains(this.ennemy) && !document.getElementById(x+y).classList.contains('pion'))
            {
                // Ajout de la classe "selected" aux déplacement possible
                document.getElementById(x+y).classList.toggle("selected")

                let selected = document.getElementsByClassName("selected");
                for (let movement_possible of selected)
                {
                    movement_possible.addEventListener('click', this.move);
                }
            }

            this.attack();
        }
    }

    attack()
    {
        let possible_attack = [
            (String.fromCharCode(this.position.id[0].charCodeAt(0) + 1)) + (parseInt(this.position.id[1]) + 1),
            (String.fromCharCode(this.position.id[0].charCodeAt(0) - 1)) + (parseInt(this.position.id[1]) + 1),
        ];
        
        possible_attack.forEach(element => {
            if(!element.includes('@') && !element.includes('I'))
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