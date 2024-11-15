import Phaser from "phaser";
import background from "../assets/images/Title_Background.png";
import backgroundMusic from "../assets/music/cheerful_intro_nodissonance.mid";
import MusicPlayer from "../gameobjects/MusicPlayer";
import Settings from "../gameobjects/Settings";

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
    this.gameDifficulties = ["Easy", "Medium", "Hard"];
    this.selectedDifficulty = this.gameDifficulties[1];
    this.musicPlayer = null; // Declare musicPlayer as null initially
    this.difficultyTextObjects = [];
  }

  preload() {
    this.load.image("background", background);
  }

  create() {
    // Add a background
    const bg = this.add.image(700, 350, "background");
    bg.setScale(0.7);

    // Initialize the MusicPlayer
    this.musicPlayer = new MusicPlayer(this, backgroundMusic);

    // Start playing the MIDI music only after a user gesture
    this.input.on("pointerdown", async () => {
      await this.musicPlayer.initializeAudio(); // Ensure AudioContext is initialized
      if (this.musicPlayer.audioContext.state === "suspended") {
        await this.musicPlayer.audioContext.resume();
      }
      this.musicPlayer.loadAndPlayMusic(); // Play music after resuming
    });

    // Add volume control buttons for demonstration
    this.createVolumeControl();

    // Create the "New Game" button
    const newGameButtonBox = this.add.graphics();
    newGameButtonBox.fillStyle(0x808080, 0.9);
    newGameButtonBox.fillRect(530, 140, 440, 120);

    this.titleText = this.add
      .text(750, 200, "RQMO Game", {
        fontSize: "72px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    const newGameButton = this.add
      .text(750, 350, "New Game", {
        fontSize: "48px",
        fill: "#ffffff",
      })
      .setOrigin(0.5)
      .setInteractive();

    newGameButton.on("pointerdown", () => {
      this.scene.start("DoctorOfficeScene", { difficulty: this.selectedDifficulty });
    });

    this.tweens.add({
      targets: newGameButton,
      scale: 1.1,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    // Create difficulty selector
    this.createDifficultySelector(this.gameDifficulties);
  }

  createDifficultySelector(difficulties) {
    const screenCenterX = this.cameras.main.width / 2;
    const spacing = 200;
    const totalWidth = (difficulties.length - 1) * spacing;
    let currentX = screenCenterX - totalWidth / 2;

    // Clear the difficultyTextObjects array in case this function is called multiple times
    this.difficultyTextObjects = [];

    difficulties.forEach((level) => {
      const difficultyText = this.add
        .text(currentX, 500, level, {
          fontSize: "36px",
          fill: this.selectedDifficulty === level ? "#ff0000" : "#ffffff",
        })
        .setInteractive()
        .setOrigin(0.5);

      difficultyText.on("pointerdown", () => {
        this.selectedDifficulty = level;
        Settings.difficulty = level;
        this.updateDifficultyColors();
      });

      // Store the text object in the array for easy access
      this.difficultyTextObjects.push(difficultyText);
      currentX += spacing;
    });
  }

  updateDifficultyColors() {
    // Update the color of each difficulty text based on the selected difficulty
    this.difficultyTextObjects.forEach((textObject, index) => {
      const level = this.gameDifficulties[index];
      const color = level === this.selectedDifficulty ? "#ff0000" : "#ffffff";
      textObject.setStyle({ fill: color });
    });
  }

  createVolumeControl() {
    // Create volume up button
    const volumeUpButton = this.add.text(100, 100, "Volume Up", {
      fontSize: "24px",
      fill: "#ffffff",
    }).setInteractive();

    volumeUpButton.on("pointerdown", async () => {
      await this.musicPlayer.setVolume(0); // Set volume to full
    });

    // Create volume down button
    const volumeDownButton = this.add.text(100, 150, "Volume Down", {
      fontSize: "24px",
      fill: "#ffffff",
    }).setInteractive();

    volumeDownButton.on("pointerdown", async () => {
      await this.musicPlayer.setVolume(-20); // Lower the volume
    });

    // Create mute button
    const muteButton = this.add.text(100, 200, "Mute", {
      fontSize: "24px",
      fill: "#ffffff",
    }).setInteractive();

    muteButton.on("pointerdown", async () => {
      await this.musicPlayer.setVolume(-60); // Mute the audio
    });
  }
}

export default TitleScene;
