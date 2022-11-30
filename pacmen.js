var pos = 0;
const pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
    ['PacMan3.png', 'PacMan4.png']
];
let shrinkScale = 1;

var direction = 0;
const pacMen = []; // This array holds all the pacmen
let projBox = document.getElementById('proj-content').getBoundingClientRect();
console.log(projBox);


function setToRandom(scale,selector) {
    if (selector){
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }
    return {
        x: (Math.random() * scale) + projBox.x,
        y: (Math.random() * scale) + projBox.y
    }
}
    // Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10,1); // {x:?, y:?}
    console.log('Velocity: ' + velocity.x + ', ' + velocity.y);
    let position = setToRandom(20,0);
    console.log('Position: ' + position.x + ', ' + position.y);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = 'img/PacMan1.png';
    newimg.width = 100;
    newimg.style.left = position.x + 'px';
    console.log('New image left details: ' + newimg.style.left);
    newimg.style.top = position.y + 'px';    
    console.log('New image top details: ' + newimg.style.top);

    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    console.log('Game details: ' + game);
    return {
        position,
        velocity,
        newimg
    }
}

function update() {
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)
        //item.newimg.width = item.newimg.width - 25;
        if (item.newimg.width === 0) return;
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        
        item.newimg.style.left = item.position.x + 'px';
        item.newimg.style.top = item.position.y + 'px';
        
    })
    setTimeout(update, 20);
}

function checkCollisions(item) {
    if (item.position.x + item.newimg.width > projBox.width || 
        item.position.x + item.velocity.x < projBox.x) {
            item.velocity.x = -item.velocity.x;
            item.newimg.width = item.newimg.width - 20;
        }
    if (item.position.y + item.velocity.y + item.newimg.width > projBox.bottom || 
        item.position.y + item.velocity.y < projBox.top) {
            item.velocity.y = -item.velocity.y;
            item.newimg.width = item.newimg.width - 20;
        } 
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}