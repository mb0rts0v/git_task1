import { Pokemon } from './pokemon.js';
import { logs, addLog, getRandomLog } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const logsDiv = document.createElement('div');
    logsDiv.id = 'logs';
    document.body.appendChild(logsDiv);

    const character = new Pokemon('Pikachu', 100, 
        document.getElementById('progressbar-character'), 
        document.getElementById('health-character'));

    const enemies = [
        new Pokemon('Charmander', 100, 
            document.getElementById('progressbar-enemy1'), 
            document.getElementById('health-enemy1')),
        new Pokemon('Bulbasaur', 100, 
            document.getElementById('progressbar-enemy2'), 
            document.getElementById('health-enemy2'))
    ];

    const checkGameOver = () => {
        const allEnemiesDefeated = enemies.every(({ health }) => health === 0);
        const isCharacterDefeated = character.health === 0;

        if (isCharacterDefeated && allEnemiesDefeated) {
            addLog(logsDiv, 'Нічия! Всі учасники бою втратили здоров\'я!');
            alert('Draw! Everyone lost!');
            location.reload();
        } else if (isCharacterDefeated) {
            addLog(logsDiv, 'Гра закінчена! Пікачу програв!');
            alert('Game Over! Pikachu has lost!');
            location.reload();
        } else if (allEnemiesDefeated) {
            addLog(logsDiv, 'Вітаємо! Пікачу переміг усіх ворогів!');
            alert('Congratulations! Pikachu has won!');
            location.reload();
        }
    };

    const handleKick = (kickClickCounter) => {
        if (kickClickCounter()) {
            enemies.forEach(enemy => {
                const damage = Math.floor(Math.random() * 20) + 1;
                enemy.receiveDamage(damage, character.name, getRandomLog.bind(null, logs), addLog.bind(null, logsDiv));
            });

            const characterDamage = Math.floor(Math.random() * 20) + 1;
            character.receiveDamage(characterDamage, enemies[Math.floor(Math.random() * enemies.length)].name, getRandomLog.bind(null, logs), addLog.bind(null, logsDiv));

            checkGameOver();
        }
    };

    const handleKickStrong = (strongKickClickCounter) => {
        if (strongKickClickCounter()) {
            enemies.forEach(enemy => {
                const damage = Math.floor(Math.random() * 30) + 1;
                enemy.receiveDamage(damage, character.name, getRandomLog.bind(null, logs), addLog.bind(null, logsDiv));
            });

            const characterDamage = Math.floor(Math.random() * 30) + 1;
            character.receiveDamage(characterDamage, enemies[Math.floor(Math.random() * enemies.length)].name, getRandomLog.bind(null, logs), addLog.bind(null, logsDiv));

            checkGameOver();
        }
    };

    const createClickCounter = (buttonId, maxClicks) => {
        let clickCount = 0;
        return () => {
            if (clickCount < maxClicks) {
                clickCount++;
                console.log(`${buttonId}: Кількість натискань ${clickCount}/${maxClicks}`);
                return true;
            } else {
                console.log(`${buttonId}: Ліміт натискань вичерпано`);
                return false;
            }
        };
    };

    const kickClickCounter = createClickCounter('btn-kick', 7);
    const strongKickClickCounter = createClickCounter('btn-strong-kick', 7);

    const $btnKick = document.getElementById('btn-kick');
    const $btnStrongKick = document.getElementById('btn-strong-kick');

    $btnKick.addEventListener('click', () => handleKick(kickClickCounter));
    $btnStrongKick.addEventListener('click', () => handleKickStrong(strongKickClickCounter));
});