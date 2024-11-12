import Phaser from "phaser";
import background from "../assets/Title_Background.png";
import Settings from "../gameobjects/Settings";

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
    this.gameDifficulties = ["Easy", "Medium", "Hard"];
    this.selectedDifficulty = this.gameDifficulties[1];
  }

  preload() {
    this.load.image("background", background);
    // this.load.image("startButton", "assets/startButton.png"); // Optional start button image
  }

  create() {
    // Add a background
    const bg = this.add.image(700, 350, "background"); // Position at the center of the screen
    bg.setScale(0.7);

    // Replace the button image with a text button
    const newGameButtonBox = this.add.graphics();
    newGameButtonBox.fillStyle(808080, 0.9); // Blue color with 80% opacity
    newGameButtonBox.fillRect(530, 140, 440, 120);

    // Add the title text
    this.titleText = this.add
      .text(750, 200, "RQMO Game", {
        fontSize: "72px",
        fill: "#ffffff",
      })
      .setOrigin(0.5); // Center the text

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
    // center the text to the middle of the screen
    const screenCenterX = this.cameras.main.width / 2;
    const spacing = 200;
    const totalWidth = (difficulties.length - 1) * spacing;
    let currentX = screenCenterX - totalWidth / 2;

    difficulties.forEach((level) => {
      const difficultyText = this.add
        .text(currentX, 500, level, {
          fontSize: "36px",
          fill: this.selectedDifficulty === level ? "#ff0000" : "#ffffff", // Highlight selected level
        })
        .setInteractive()
        .setOrigin(0.5);

      difficultyText.on("pointerdown", () => {
        this.selectedDifficulty = level;
        Settings.difficulty = level; 
        this.updateDifficultyColors(difficulties);
      });

      currentX += spacing; // Adjust for spacing between difficulty levels
    });
  }

  updateDifficultyColors(difficulties) {
    difficulties.forEach((level, index) => {
      const color = level === this.selectedDifficulty ? "#ff0000" : "#ffffff";
      this.children.getAt(index + 4).setStyle({ fill: color }); // Access each difficulty text by its index
    });
  }
}

export default TitleScene;
