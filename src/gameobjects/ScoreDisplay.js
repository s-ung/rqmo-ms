import Inventory from './Inventory';

export default class ScoreDisplay {
    constructor(scene, x, y, maxScore = 100) {
        this.scene = scene;
        this.inventory = Inventory.getInstance();
        this.maxScore = maxScore; // Set the maximum score for scaling the bar width

        // background container
        this.backgroundBox = this.scene.add.rectangle(x-10, y+10, 280, 100, 0x000000, 0.8);

        // Stress Score Bar
        this.stressBarBackground = this.scene.add.rectangle(x, y, 200, 20, 0x555555);
        this.stressBar = this.scene.add.rectangle(x - 100, y, this.getBarWidth(this.inventory.stressScore), 20, 0xff0000);
        this.stressLabel = this.scene.add.text(x - 100, y - 10, 'Stress', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 1);
        this.stressPercentageText = this.scene.add.text(x + 115, y, `${this.getPercentage(this.inventory.stressScore)}%`, { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0.5);

        // Diagnostic Score Bar
        this.diagnosticBarBackground = this.scene.add.rectangle(x, y + 40, 200, 20, 0x555555);
        this.diagnosticBar = this.scene.add.rectangle(x - 100, y + 40, this.getBarWidth(this.inventory.diagnosticScore), 20, 0x0000ff);
        this.diagnosticLabel = this.scene.add.text(x - 86, y + 30, 'Diagnostic', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 1);
        this.diagnosticPercentageText = this.scene.add.text(x + 115, y + 40, `${this.getPercentage(this.inventory.diagnosticScore)}%`, { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 0.5);
    }

    getBarWidth(score) {
        return (score / this.maxScore) * 200; // 200 is the width of the background bar
    }

    getPercentage(score) {
        return Math.round((score / this.maxScore) * 100);
    }

    updateScores() {
        // bar width
        this.stressBar.width = this.getBarWidth(this.inventory.stressScore);
        this.diagnosticBar.width = this.getBarWidth(this.inventory.diagnosticScore);

        // percentage
        this.stressPercentageText.setText(`${this.getPercentage(this.inventory.stressScore)}%`);
        this.diagnosticPercentageText.setText(`${this.getPercentage(this.inventory.diagnosticScore)}%`);
    }
}
