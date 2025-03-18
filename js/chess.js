import pawn from "./pawn.js";

for (let i = "A".charCodeAt(0); i <= "H".charCodeAt(0); i++) {
    // pion blanc
    new pawn(String.fromCharCode(i)+"2", 'white');

    // pion noir
    // new pawn(String.fromCharCode(i)+"7", 'black');
}



/**
 * 
 * @param {int} x 
 * @param {int} y 
 * @param {string} name 
 */
function position (x, y, name) {
    let rows = document.getElementsByClassName("ligne");
    rows[x].children[y].innerText = name;
    rows[x].children[y].classList.add(name);
    rows[x].children[y].classList.add('black');
}

/**
 * 
 * @param {Map} map 
 */
function setPosition (map) {
    for (let [key, value] of map.entries()) {
        value.forEach(element => {
            position(element[0], element[1], key);
        });
    }
}

let rows = document.getElementsByClassName("ligne");
let bpieces = new Map;
// let wpieces = new Map;

// Pion
let bpion = new Array;
let wpion = new Array;
for (let i = 0; i < rows.length; i++) {
    bpion.push([i, 1]);
    wpion.push([i, 6]);
}
bpieces.set("pion", bpion);
// wpieces.set("pion", wpion);

// Tour
let btour = new Array(
    [0, 0],
    [0, 7]
);
let wtour = new Array(
    [7, 0],
    [7, 7]
);
bpieces.set("tour", btour);
// wpieces.set("tour", wtour);

// cavalier
let bcavalier = new Array(
    [1, 0],
    [1, 7]
);
let wcavalier = new Array(
    [6, 0],
    [6, 7]
);
bpieces.set("cavalier", bcavalier);
// wpieces.set("cavalier", wcavalier);

// fou
let bfou = new Array(
    [2, 0],
    [2, 7]
);
let wfou = new Array(
    [5, 0],
    [5, 7]
);
bpieces.set("fou", bfou);
// wpieces.set("fou", wfou);

// reine
let breine = new Array(
    [3, 0],
);
let wreine = new Array(
    [3, 7]
);
bpieces.set("reine", breine);
// wpieces.set("reine", wreine);

// roi
let broi = new Array(
    [4, 0]
);
let wroi = new Array(
    [4, 7]
);
bpieces.set("roi", broi);
// wpieces.set("roi", wroi);

// bpieces.get("tour")[0] = [4, 4];
// btour[0] = [6, 6];

// setPosition(wpieces);
setPosition(bpieces);

Array.prototype.forEach.call(document.getElementsByClassName("case"), function (el) {
    el.addEventListener("click", (e) => {
        e.target.classList.toggle("piece_select");
        const border = getComputedStyle(e.target).border;
        let test;
        for (test of document.getElementsByClassName("case")) {
            test.classList.remove("selected");
        }
        if (e.target.classList.contains("pion")) {
            let i = 0;
            for (let element of e.target.parentElement.children) {
                if (element === e.target) {
                    e.target.parentElement.children[i - 1].classList.toggle("selected");
                    e.target.parentElement.children[i - 2].classList.toggle("selected");
                }
                else {

                }
                i++;
            }
        }
        else if (e.target.classList.contains("roi")) {
            console.log("est un roi");
        }
    })
})