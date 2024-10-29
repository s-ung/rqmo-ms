import { Scenes } from 'phaser';
import { ChatBox, ChatDropdownInput } from '../gameobjects/Chat';
import { GameTree } from '../gameobjects/Game';
import ScoreDisplay from '../gameobjects/ScoreDisplay';
export default class Utils {
  /**
   * Set an image as the background and fit it to the game screen.
   *
   * @param {Phaser.Scene} scene - The Phaser scene where the background is being set.
   * @param {string} key - The key of the image (preloaded in the scene).
   * @returns {Phaser.GameObjects.Image} The background image object.
   */
  static setBackground(scene, key) {
    const background = scene.add.image(
      scene.scale.width / 2,
      scene.scale.height / 2,
      key
    );
    const scaleX = scene.scale.width / background.width;
    const scaleY = scene.scale.height / background.height;
    const scale = Math.max(scaleX, scaleY);
    background.setScale(scale).setScrollFactor(0);
    return background;
  }

  static setUpScene(scene) {
    // Access the scene data directly from the JavaScript object
    scene.gameTree = GameTree.getInstance();
    // Set up the scene visuals
    scene.canvas = scene.sys.game.canvas;
    scene.width = scene.canvas.width;
    scene.height = scene.canvas.height;

    // Create the chatbox
    let rectHeight = scene.height / 4;
    let rectMargin = 0.1 * scene.width;

    // Create the chat box at the bottom of the screen
    scene.chatBox = new ChatBox(
      scene,
      rectMargin,
      scene.height - rectHeight,
      scene.width - 2 * rectMargin,
      rectHeight,
      ChatDropdownInput
    );

    // Listen for player input using an arrow function to maintain the `this` context
    scene.chatBox.chatController.addListener(scene);

    // Initialize ScoreDisplay
    scene.scoreDisplay = new ScoreDisplay(scene, 250, 40);
  }
}
