export default class piece {
    position;
    team;
    ennemy;
    name;
    movement;

    /**
     * @param {String} name 
     * @param {String} position 
     * @param {Array} movement 
     * @param {String} team 
     */
    constructor(name, movement, position, team) { 
        this.movement = movement;
        this.setPosition(position);
        this.setName(name);
        this.setTeam(team);
    }

    /**
     * Initialisation de la position
     * @param {string} position 
     */
    setPosition(position) {
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
     * action de mouvement
     * @param {String} position 
     */
    movement_action(position)
    {
        this.position = document.getElementById(position);
        this.position.classList.add(this.team);
        this.position.classList.add(this.name);
        this.position.innerText = this.name;
    }

    /**
     * 
     * @param {object} e 
     */
    move = (e) => {
        if(e.target.classList.contains('selected') || e.target.classList.contains('attack'))
        {
            document.getElementById(e.target.id).innerHTML = '';
            document.getElementById(e.target.id).classList = '';

            this.position.innerText = '';
            this.position.classList.remove(this.name);
            this.position.classList.remove(this.team);

            this.deselection();
            this.position.removeEventListener('click', this.select);

            this.movement_action(e.target.id);
        }

        this.position.addEventListener('click', this.select);
    }
    
    /**
     * Suppression de la classe css "selected" sur tout le plateau 
     */
    deselection()
    {
        for(let line of document.getElementsByClassName('ligne'))
        {
            for(let cell of line.children)
            {
                cell.removeEventListener('click', this.move)
                cell.classList.remove('selected');
                cell.classList.remove('attack');
            }
        }
    }
}