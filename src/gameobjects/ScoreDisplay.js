import Inventory from './Inventory';

export class ScoreDisplay {
    static #instance = null; // Private static property for the singleton instance

    constructor(scene, x, y, maxScore = 100) {
        if (ScoreDisplay.#instance) {
            return ScoreDisplay.#instance;
        }

        this.scene = scene;
        this.inventory = Inventory.getInstance();
        this.maxScore = maxScore; // Set the maximum score for scaling the bar width

        // Background container
        this.backgroundBox = this.scene.add.rectangle(x - 5, y + 40, 270, 150, 0x000000, 0.8).setDepth(1);

        // Stress Score Bar
        this.stressBarBackground = this.scene.add.rectangle(x, y, 200, 20, 0x555555).setDepth(1);
        this.stressBar = this.scene.add.rectangle(x - 100, y, this.getBarWidth(this.inventory.stressScore), 20, 0xff0000).setDepth(1);
        this.stressLabel = this.scene.add.text(x - 100, y - 10, 'Stress', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 1).setDepth(1);
        this.stressPercentageText = this.scene.add.text(x + 115, y, `${this.getPercentage(this.inventory.stressScore)}%`, { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(1);

        // Pain Score Bar
        this.painBarBackground = this.scene.add.rectangle(x, y + 40, 200, 20, 0x555555).setDepth(1);
        this.painBar = this.scene.add.rectangle(x - 100, y + 40, this.getBarWidth(this.inventory.painScore), 20, 0xffa500).setDepth(1); // Orange for Pain
        this.painLabel = this.scene.add.text(x - 110, y + 30, 'Pain', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 1).setDepth(1).setDepth(1);
        this.painPercentageText = this.scene.add.text(x + 115, y + 40, `${this.getPercentage(this.inventory.painScore)}%`, { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(1);

        // Diagnostic Score Bar
        this.diagnosticBarBackground = this.scene.add.rectangle(x, y + 80, 200, 20, 0x555555).setDepth(1);
        this.diagnosticBar = this.scene.add.rectangle(x - 100, y + 80, this.getBarWidth(this.inventory.diagnosticScore), 20, 0x0000ff).setDepth(1);
        this.diagnosticLabel = this.scene.add.text(x - 86, y + 70, 'Diagnostic', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 1).setDepth(1);
        this.diagnosticPercentageText = this.scene.add.text(x + 115, y + 80, `${this.getPercentage(this.inventory.diagnosticScore)}%`, { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(1);

        // Assign this instance to the static property
        ScoreDisplay.#instance = this;
    }

    static getInstance(scene, x, y, maxScore = 100) {
        if (!ScoreDisplay.#instance) {
            new ScoreDisplay(scene, x, y, maxScore);
        }
        return ScoreDisplay.#instance;
    }

    getBarWidth(score) {
        return ((score * this.getDifficultyMultiplier()) / this.maxScore) * 200; // 200 is the width of the background bar
    }

    getPercentage(score) {
        return Math.round(((score * this.getDifficultyMultiplier()) / this.maxScore) * 100);
    }

    updateScores() {
        // Bar width
        this.stressBar.width = this.getBarWidth(this.inventory.stressScore);
        this.painBar.width = this.getBarWidth(this.inventory.painScore);
        this.diagnosticBar.width = this.getBarWidth(this.inventory.diagnosticScore);

        // Percentage
        this.stressPercentageText.setText(`${this.getPercentage(this.inventory.stressScore)}%`);
        this.painPercentageText.setText(`${this.getPercentage(this.inventory.painScore)}%`);
        this.diagnosticPercentageText.setText(`${this.getPercentage(this.inventory.diagnosticScore)}%`);
    }

    getDifficultyMultiplier() {
        let multiplier;
        switch (this.scene.difficulty) {
            case "Easy":
                multiplier = 0.5;
                break;
            case "Medium":
                multiplier = 1;
                break;
            case "Hard":
                multiplier = 1.5;
                break;
            default:
                multiplier = 0.5;
        }
        return multiplier;
    }
}
