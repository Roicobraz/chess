export default class piece {
    position;
    team;
    ennemy;
    name;
    movement;
    id;

    /**
     * @param {String} name 
     * @param {String} position 
     * @param {Array} movement 
     * @param {String} team 
     */
    constructor(name, movement, position, team) { 
        this.movement = movement;
        this.setPosition(position); 
        this.setTeam(team);
        this.setName(name);
    }

    /**
     * Initialisation de la position
     * @param {string} position 
     */
    setPosition(position) {
        this.id = position;
        this.position = document.getElementById(position);
    }

    /**
     * Initilisation de la équipe
     * ajout de la classe équipe
     * @param {string} team 
     */
    setTeam(team) {
        this.team = team;
        if(this.team == 'black')
        {
            this.ennemy = 'white';
        }
        else if(this.team == 'white')
        {
            this.ennemy = 'black';
        }
        this.position.classList.add(this.team);
    }

    /**
     * Initialisation du nom
     * ajout de la classe et du contenu du block correspondant
     * @param {String} name 
     */
    setName(name) {
        this.name = name;
        this.position.innerText = this.name;
        this.position.classList.add(this.name);
    }

    /**
     * 
     * @param {String} position 
     */
    movement_action(position)
    {  
        // suppression de l'évent
        this.position.removeEventListener('click', this.select, true);

        // déplacement de la pièce
        this.id = position;
        this.position = document.getElementById(position);
        this.position.classList.add(this.team);
        this.position.classList.add(this.name);
        this.position.innerText = this.name;    
        this.position.addEventListener('click', this.select, true);

        if(this.team == 'white')
        {
            window.white_turn = false;
            window.black_turn = true;
        }
        else if(this.team == 'black')
        {
            window.black_turn = false;
            window.white_turn = true;
        }
    }

    /**
     * déplacement de la pièce 
     * @param {object} e 
     */
    move = (e) => {
        if(e.target.classList.contains('selected') || e.target.classList.contains('attack'))
        {
            if(e.target.classList.contains('attack'))
            {
                e.target.classList.add('is_attack');
                e.target.addEventListener('click', this.dead);
                e.target.click();
            }
            
            this.position.innerText = '';
            this.position.classList.remove(this.name);
            this.position.classList.remove(this.team);

            this.deselection();
            this.position.removeEventListener('click', this.select);

            this.movement_action(e.target.id);
        }
    }
    
    /**
     * Suppression de la classe css "selected" sur tout le plateau 
     */
    deselection()
    {
        for(let line of document.getElementsByClassName('col'))
        {
            for(let cell of line.children)
            {
                if(cell.classList.contains('selected'))
                {
                    cell.removeEventListener('click', this.move);
                }    
                cell.classList.remove('piece_selected');
                cell.classList.remove('selected');
                cell.classList.remove('attack');
            }
        }
    }

    /**
     * Mise sur le banc une fois qu'une pièce a été mangé
     * @param {object} e 
     */
    dead = (e) =>
    {
        let is_attack = e.target;
        is_attack.classList.remove('attack');
        is_attack.classList.remove('is_attack');

        let team = is_attack.classList[0];
        let name = is_attack.classList[1];

        is_attack.classList = '';

        // ajout au banc la pièce mangé
        console.log(team);
        let dead = document.getElementById(team + '_eaten');

        let div = document.createElement("div");
        let id = 'is_dead_' + (dead.children.length + 1).toString()
        div.id = id;
        div.classList.add(name);
        div.classList.add(team);
        div.innerText = team + ' ' + name;
        dead.append(div); 

        e.target.removeEventListener('click', this.dead);
    }
}