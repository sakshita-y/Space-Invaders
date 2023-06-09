const grid = document.querySelector('.grid')
const Display = document.querySelector('.results')
let currentShooter = 200
let width = 15
let direction = 1
let invaderss 
let movingright = true
let aliensremoved = []
let scoring = 0
for (let i = 0; i < 225; i++) {
    const box = document.createElement('div')
    grid.appendChild(box)
}

const boxes = Array.from(document.querySelectorAll('.grid div'))
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for(let i = 0; i < alienInvaders.length; i++) {
        if(!aliensremoved.includes(i)) {
        boxes[alienInvaders[i]].classList.add('invader')
        }
    }
}

draw()

function Delete() {
    for(let i = 0; i < alienInvaders.length; i++) {
        boxes[alienInvaders[i]].classList.remove('invader')
    }
}

boxes[currentShooter].classList.add('shooter')

function Shooter(e) {
    boxes[currentShooter].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft' :
            if (currentShooter % width !== 0) currentShooter -=1
            break
        case 'ArrowRight' :
            if (currentShooter % width < width -1 ) currentShooter +=1
            break
    }
    boxes[currentShooter].classList.add('shooter')
}
document.addEventListener('keydown', Shooter)

function Invaders() {
    const leftEdge = alienInvaders[0] % width === 0 
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
Delete()
if (rightEdge && movingright) {
    for(let i = 0; i<alienInvaders.length; i++) {
        alienInvaders[i] += width +1
        direction=-1
        movingright = false
    }
}

if (leftEdge && !movingright) {
    for(let i = 0; i<alienInvaders.length; i++) {
        alienInvaders[i] += width -1
        direction=1
        movingright = true
    }
}

for(let i = 0; i <alienInvaders.length; i++) {
    alienInvaders[i] += direction
}

draw()

if (boxes[currentShooter].classList.contains('invader', 'shooter')) {
    clearInterval(invaderss)
    Display.innerHTML = 'game over!'
}

for(let i = 0; i <alienInvaders.length; i++) {
    if(alienInvaders[i] > (boxes.length)) {
        Display.innerHTML = 'game over!'
        clearInterval(invaderss)
    }
}
 
if (aliensremoved.length===alienInvaders.length){
    Display.innerHTML = 'you win!'
    clearInterval(invaderss)
}

}

invaderss = setInterval(Invaders, 500)

function shoot(e) {
    let id
    let idIndex = currentShooter
    function moveId() {
        boxes[idIndex].classList.remove('idd') 
        idIndex-=width
        boxes[idIndex].classList.add('idd')
        
        if(boxes[idIndex].classList.contains('invader')) {
            boxes[idIndex].classList.remove('idd') 
            boxes[idIndex].classList.remove('invader')
            boxes[idIndex].classList.add('blast')

            setTimeout(()=> boxes[idIndex].classList.remove('blast'), 300)
            clearInterval(id)

            const alienremoved = alienInvaders.indexOf(idIndex)
            aliensremoved.push(alienremoved)
            scoring++
            Display.innerHTML=scoring
        }
        
    }
    switch(e.key) {
        case 'ArrowUp':
            id = setInterval(moveId, 100)
    }
}

document.addEventListener('keydown', shoot)