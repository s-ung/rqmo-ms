import Inventory from './Inventory';
import Settings from './Settings';

export class ScoreDisplay {
    static #instance = null; // Private static property for the singleton instance

    constructor(scene, x, y, maxScore = 100) {
        if (ScoreDisplay.#instance) {
            ScoreDisplay.#instance.setScene(scene);
            return ScoreDisplay.#instance;
        }

        this.scene = scene;
        this.inventory = Inventory.getInstance();
        this.maxScore = maxScore;
        this.x = x;
        this.y = y;

        // Initialize UI elements
        this.uiElements = {}; // Store UI elements in an object
        this.createUIElements();

        // Assign this instance to the static property
        ScoreDisplay.#instance = this;
    }

    static getInstance(scene, x, y, maxScore = 100) {
        if (!ScoreDisplay.#instance) {
            new ScoreDisplay(scene, x, y, maxScore);
        } else {
            ScoreDisplay.#instance.setScene(scene);
        }
        return ScoreDisplay.#instance;
    }

    // Method to create UI elements
    createUIElements() {
        const { x, y } = this;
    
        // Shift the x-coordinate to the right side of the screen
        const offsetX = this.scene.scale.width - 300; // Adjust for padding from the right edge
    
        // Background container
        this.uiElements.backgroundBox = this.scene.add.rectangle(offsetX + 150, y + 40, 270, 150, 0x000000, 0.8).setDepth(1);
    
        // Stress Score Bar
        this.uiElements.stressBarBackground = this.scene.add.rectangle(offsetX + 150, y, 200, 20, 0x555555).setDepth(1);
        this.uiElements.stressBar = this.scene.add.rectangle(offsetX + 50, y, this.getBarWidth(this.inventory.stressScore), 20, 0xff0000).setDepth(1);
        this.uiElements.stressLabel = this.scene.add.text(offsetX + 50, y - 10, 'Stress', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 1).setDepth(1);
        this.uiElements.stressPercentageText = this.scene.add.text(offsetX + 265, y, `${this.getPercentage(this.inventory.stressScore)}%`, { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(1);
    
        // Pain Score Bar
        this.uiElements.painBarBackground = this.scene.add.rectangle(offsetX + 150, y + 40, 200, 20, 0x555555).setDepth(1);
        this.uiElements.painBar = this.scene.add.rectangle(offsetX + 50, y + 40, this.getBarWidth(this.inventory.painScore), 20, 0xffa500).setDepth(1); 
        this.uiElements.painLabel = this.scene.add.text(offsetX + 40, y + 30, 'Pain', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 1).setDepth(1);
        this.uiElements.painPercentageText = this.scene.add.text(offsetX + 265, y + 40, `${this.getPercentage(this.inventory.painScore)}%`, { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(1);
    
        // Diagnostic Score Bar
        this.uiElements.diagnosticBarBackground = this.scene.add.rectangle(offsetX + 150, y + 80, 200, 20, 0x555555).setDepth(1);
        this.uiElements.diagnosticBar = this.scene.add.rectangle(offsetX + 50, y + 80, this.getBarWidth(this.inventory.diagnosticScore), 20, 0x0000ff).setDepth(1);
        this.uiElements.diagnosticLabel = this.scene.add.text(offsetX + 64, y + 70, 'Diagnostic', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 1).setDepth(1);
        this.uiElements.diagnosticPercentageText = this.scene.add.text(offsetX + 265, y + 80, `${this.getPercentage(this.inventory.diagnosticScore)}%`, { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0.5).setDepth(1);
    }

    // Setter method to update the scene
    setScene(newScene) {
        this.scene = newScene;

        // Destroy existing UI elements to avoid Phaser's scene management issues
        Object.values(this.uiElements).forEach(element => element.destroy());

        // Recreate UI elements in the new scene
        this.createUIElements();
    }

    getBarWidth(score) {
        return ((score * this.getDifficultyMultiplier()) / this.maxScore) * 200; // 200 is the width of the background bar
    }

    getPercentage(score) {
        return Math.round(((score * this.getDifficultyMultiplier()) / this.maxScore) * 100);
    }

    updateScores() {
        // Update bar widths and percentages
        this.uiElements.stressBar.width = this.getBarWidth(this.inventory.stressScore);
        this.uiElements.painBar.width = this.getBarWidth(this.inventory.painScore);
        this.uiElements.diagnosticBar.width = this.getBarWidth(this.inventory.diagnosticScore);

        this.uiElements.stressPercentageText.setText(`${this.getPercentage(this.inventory.stressScore)}%`);
        this.uiElements.painPercentageText.setText(`${this.getPercentage(this.inventory.painScore)}%`);
        this.uiElements.diagnosticPercentageText.setText(`${this.getPercentage(this.inventory.diagnosticScore)}%`);
    }

    getDifficultyMultiplier() {
        const difficultyConfig = {
            "Easy": 0.5,
            "Medium": 1,
            "Hard": 1.5,
        };
        return difficultyConfig[Settings.difficulty] || 0.5;
    }
}
