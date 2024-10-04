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
        elProgressbar: document.getElementById(progressbarElementId),

        // Метод для відображення HP та прогрес-бару
        renderHP() {
            this.renderHPLife();
            this.renderProgressbarHP();
        },

        renderHPLife() {
            this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
        },

        renderProgressbarHP() {
            const percentage = (this.damageHP / this.defaultHP) * 100;
            this.elProgressbar.style.width = `${percentage}%`;

            if (percentage < 30) {
                this.elProgressbar.style.background = 'red';
            } else if (percentage < 60) {
                this.elProgressbar.style.background = 'yellow';
            } else {
                this.elProgressbar.style.background = 'lime';
            }
        },

        // Метод для зміни HP
        changeHP(damage) {
            if (this.damageHP <= damage) {
                this.damageHP = 0;
                alert(`Бідний ${this.name} програв бій!`);
                disableButtons();
            } else {
                this.damageHP -= damage;
            }
            this.renderHP();  // Оновлюємо відображення HP після зміни
        }
    };
}

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy1.renderHP();
    enemy2.renderHP();
}

function randomDamage(max) {
    return Math.ceil(Math.random() * max);
}

function attack(damageFunction) {
    enemy1.changeHP(damageFunction());
    enemy2.changeHP(damageFunction());
}

$btnKick.addEventListener('click', function () {
    console.log('Thunder Jolt');
    attack(() => randomDamage(20)); 
});

$btnStrongKick.addEventListener('click', function () {
    console.log('Big Punch');
    attack(() => randomDamage(40)); 
});

function disableButtons() {
    $btnKick.disabled = true;
    $btnStrongKick.disabled = true;
}

init();
