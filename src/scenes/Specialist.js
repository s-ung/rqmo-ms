import background from '../assets/background.png';
import dude from '../assets/dude.png';
import Phaser from 'phaser';
import doctor from '../assets/doctor.png';
import Utils from '../gameobjects/Utils';

export default class SpecialistScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SpecialistScene' });
    }

    preload() {
        this.load.image('SpecialistBackground', background);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('doctor', doctor, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        Utils.setUpScene(this);
        Utils.setBackground(this, 'SpecialistBackgorund');

        // Show the first specialist message right when the scene is created
        this.showSpecialistMessage();
    }

    showSpecialistMessage() {
        const prompt = this.gameTree.getHead().getPrompt()

        // Add the specialist's message to the chat without triggering input event handling
        this.chatBox.chatController.addMessage({ sender: 'Specialist', message: prompt });

        // After the specialist's message, switch to player turn and show options
        this.showPlayerOptions();  // Show player options after the specialist finishes
    }

    showPlayerOptions() {
        this.actions = this.gameTree.getPossibleActions();
        this.chatBox.chatInput.setOptions(this.actions.map((action) => action.getMessage()));
    }

    newMessage(message) {
        if (message.sender === 'Player') {
            const selectedAction = this.actions.find((action) => action.getMessage() == message.message)
            if (selectedAction) {
                this.gameTree.applyAction(selectedAction);

                this.scoreDisplay.updateScores();

                this.showSpecialistMessage();
            } else {
                console.error('No Selection Action found')
            }
        }
    }

    update() {
        // Ensure the game state stays updated
    }
}
