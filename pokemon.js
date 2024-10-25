export class Pokemon {
    constructor(name, health, progressBar, healthText) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.progressBar = progressBar;
        this.healthText = healthText;
        this.updateHealthBar();
    }

    updateHealthBar() {
        this.health = Math.max(this.health, 0);
        const healthPercentage = (this.health / this.maxHealth) * 100;
        this.progressBar.style.width = `${healthPercentage}%`;
        this.healthText.textContent = `${this.health} / ${this.maxHealth}`;
    }

    receiveDamage(damage, enemyName, getRandomLog, addLog) {
        this.health -= damage;
        this.updateHealthBar();
        const logMessage = getRandomLog(this.name, enemyName);
        addLog(`${logMessage} ${this.name} отримав ${damage} пошкоджень. Залишилось ${this.health} HP.`);
    }
}