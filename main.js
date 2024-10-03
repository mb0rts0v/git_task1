
const character = createCharacter('Pikachu', 100, 'health-character', 'progressbar-character');
const enemy1 = createCharacter('Charmander', 100, 'health-enemy1', 'progressbar-enemy1');
const enemy2 = createCharacter('Bulbasaur', 100, 'health-enemy2', 'progressbar-enemy2');


const $btnKick = document.getElementById('btn-kick');
const $btnStrongKick = document.getElementById('btn-strong-kick');

function createCharacter(name, hp, hpElementId, progressbarElementId) {
    return {
        name: name,
        defaultHP: hp,
        damageHP: hp,
        elHP: document.getElementById(hpElementId),
        elProgressbar: document.getElementById(progressbarElementId)
    };
}


function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy1);
    renderHP(enemy2);
}


function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}


function renderHPLife(person) {
    person.elHP.innerText = `${person.damageHP} / ${person.defaultHP}`;
}

function renderProgressbarHP(person) {
    const percentage = (person.damageHP / person.defaultHP) * 100;
    person.elProgressbar.style.width = `${percentage}%`;


    if (percentage < 30) {
        person.elProgressbar.style.background = 'red';
    } else if (percentage < 60) {
        person.elProgressbar.style.background = 'yellow';
    } else {
        person.elProgressbar.style.background = 'lime';
    }
}


function changeHP(person, damage) {
    if (person.damageHP <= damage) {
        person.damageHP = 0;
        alert(`Бідний ${person.name} програв бій!`);
        disableButtons();
    } else {
        person.damageHP -= damage;
    }
    renderHP(person); 
}


function randomDamage(max) {
    return Math.ceil(Math.random() * max);
}


function attack(damageFunction) {
    changeHP(enemy1, damageFunction());
    changeHP(enemy2, damageFunction());
}

$btnKick.addEventListener('click', function () {
    console.log('Thunder Jolt');
    attack(() => randomDamage(20)); 
});

$btnStrongKick.addEventListener('click', function () {
    console.log('Thunderbolt');
    attack(() => randomDamage(40)); 
});

function disableButtons() {
    $btnKick.disabled = true;
    $btnStrongKick.disabled = true;
}

init();
