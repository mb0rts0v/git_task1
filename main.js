document.addEventListener('DOMContentLoaded', () => {
    const logs = [
        '[ПЕРСОНАЖ №1] згадав щось важливе, але раптово [ПЕРСОНАЖ №2], не пам\'ятаючи себе від страху, вдарив у передпліччя ворога.',
        '[ПЕРСОНАЖ №1] поперхнувся, і за це [ПЕРСОНАЖ №2] з переляку вдарив коліном у лоб ворога.',
        '[ПЕРСОНАЖ №1] задумався, але в цей час нахабний [ПЕРСОНАЖ №2], прийнявши вольове рішення, безшумно підійшов ззаду і вдарив.',
        '[ПЕРСОНАЖ №1] прийшов до тями, але раптово [ПЕРСОНАЖ №2] випадково завдав потужного удару.',
        '[ПЕРСОНАЖ №1] поперхнувся, але в цей час [ПЕРСОНАЖ №2] неохоче роздробив кулаком ворога.',
        '[ПЕРСОНАЖ №1] здивувався, а [ПЕРСОНАЖ №2] похитнувся і завдав підступного удару.',
        '[ПЕРСОНАЖ №1] висморкався, але раптово [ПЕРСОНАЖ №2] завдав дроблячого удару.',
        '[ПЕРСОНАЖ №1] похитнувся, і раптом нахабний [ПЕРСОНАЖ №2] без причини вдарив у ногу противника.',
        '[ПЕРСОНАЖ №1] засмутився, як раптом, несподівано [ПЕРСОНАЖ №2] випадково завдав удару в живіт суперника.',
        '[ПЕРСОНАЖ №1] намагався щось сказати, але раптом [ПЕРСОНАЖ №2] від нудьги розбив брову супротивнику.'
    ];

    const logsDiv = document.createElement('div');
    logsDiv.id = 'logs';
    document.body.appendChild(logsDiv);

    const addLog = (message) => {
        const newLog = document.createElement('p');
        newLog.textContent = message;
        logsDiv.prepend(newLog);
    };

    const getRandomLog = (character1, character2) => {
        const randomIndex = Math.floor(Math.random() * logs.length);
        return logs[randomIndex].replace('[ПЕРСОНАЖ №1]', character1).replace('[ПЕРСОНАЖ №2]', character2);
    };

    const character = {
        name: 'Pikachu',
        health: 100,
        maxHealth: 100,
        progressBar: document.getElementById('progressbar-character'),
        healthText: document.getElementById('health-character'),

        updateHealthBar() {
            const { health, maxHealth, progressBar, healthText } = this;
            this.health = Math.max(health, 0);
            const healthPercentage = (this.health / maxHealth) * 100;
            progressBar.style.width = `${healthPercentage}%`;
            healthText.textContent = `${this.health} / ${this.maxHealth}`;
        },

        receiveDamage(damage, enemyName) {
            this.health -= damage;
            this.updateHealthBar();
            const logMessage = getRandomLog(this.name, enemyName);
            addLog(`${logMessage} ${this.name} отримав ${damage} пошкоджень. Залишилось ${this.health} HP.`);
        },
    };

    const enemies = [
        {
            name: 'Charmander',
            health: 100,
            maxHealth: 100,
            progressBar: document.getElementById('progressbar-enemy1'),
            healthText: document.getElementById('health-enemy1'),

            updateHealthBar() {
                const { health, maxHealth, progressBar, healthText } = this;
                this.health = Math.max(health, 0);
                const healthPercentage = (this.health / maxHealth) * 100;
                progressBar.style.width = `${healthPercentage}%`;
                healthText.textContent = `${this.health} / ${this.maxHealth}`;
            },

            receiveDamage(damage, characterName) {
                this.health -= damage;
                this.updateHealthBar();
                const logMessage = getRandomLog(this.name, characterName);
                addLog(`${logMessage} ${this.name} отримав ${damage} пошкоджень. Залишилось ${this.health} HP.`);
            },
        },
        {
            name: 'Squirtle',
            health: 100,
            maxHealth: 100,
            progressBar: document.getElementById('progressbar-enemy2'),
            healthText: document.getElementById('health-enemy2'),

            updateHealthBar() {
                const { health, maxHealth, progressBar, healthText } = this;
                this.health = Math.max(health, 0);
                const healthPercentage = (this.health / maxHealth) * 100;
                progressBar.style.width = `${healthPercentage}%`;
                healthText.textContent = `${this.health} / ${this.maxHealth}`;
            },

            receiveDamage(damage, characterName) {
                this.health -= damage;
                this.updateHealthBar();
                const logMessage = getRandomLog(this.name, characterName);
                addLog(`${logMessage} ${this.name} отримав ${damage} пошкоджень. Залишилось ${this.health} HP.`);
            },
        },
    ];

    const checkGameOver = () => {
        const allEnemiesDefeated = enemies.every(({ health }) => health === 0);
        const isCharacterDefeated = character.health === 0;

        if (isCharacterDefeated && allEnemiesDefeated) {
            addLog('Нічия! Всі учасники бою втратили здоров\'я!');
            alert('Draw! Everyone lost!');
            location.reload();
        } else if (isCharacterDefeated) {
            addLog('Гра закінчена! Пікачу програв!');
            alert('Game Over! Pikachu has lost!');
            location.reload();
        } else if (allEnemiesDefeated) {
            addLog('Вітаємо! Пікачу переміг усіх ворогів!');
            alert('Congratulations! Pikachu has won!');
            location.reload();
        }
    };

    const handleKick = (kickClickCounter) => {
        if (kickClickCounter()) {
            enemies.forEach(enemy => {
                const damage = Math.floor(Math.random() * 20) + 1;
                enemy.receiveDamage(damage, character.name);
            });

            const characterDamage = Math.floor(Math.random() * 20) + 1;
            character.receiveDamage(characterDamage, enemies[Math.floor(Math.random() * enemies.length)].name);

            checkGameOver();
        }
    };

    const handleKickStrong = (strongKickClickCounter) => {
        if (strongKickClickCounter()) {
            enemies.forEach(enemy => {
                const damage = Math.floor(Math.random() * 30) + 1;
                enemy.receiveDamage(damage, character.name);
            });

            const characterDamage = Math.floor(Math.random() * 30) + 1;
            character.receiveDamage(characterDamage, enemies[Math.floor(Math.random() * enemies.length)].name);

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
