import Phaser from "phaser";
import titleBackground from "../assets/Title_Background.png";
import Utils from "../gameobjects/Utils";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
  }

  preload() {
    this.load.image("titleBackground", titleBackground);
  }

  create() {
    Utils.setBackground(this, "titleBackground")

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
      this.scene.switch("WaitingRoomScene");
    });

    this.tweens.add({
      targets: newGameButton,
      scale: 1.1,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });
  }
}