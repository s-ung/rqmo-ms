import Phaser from 'phaser';

class LosingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LosingScene' });
    }

    create() {
        this.add.text(300, 150, 'You are too stressed! Game Over.', {
            fontSize: '32px',
            color: '#ff0000',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        const restartButton = this.add.text(300, 250, 'Restart Game', {
            fontSize: '28px',
            backgroundColor: '#00ff00',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            borderRadius: 5,
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        const mainMenuButton = this.add.text(300, 350, 'Return to Main Menu', {
            fontSize: '28px',
            backgroundColor: '#0000ff',
            color: '#ffffff',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            borderRadius: 5,
        }).setOrigin(0.5).setInteractive();

        mainMenuButton.on('pointerdown', () => {
            this.scene.start('TitleScene'); 
        });
    }
}

export default LosingScene;
