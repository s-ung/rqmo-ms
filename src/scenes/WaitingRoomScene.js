import Phaser from "phaser";
import Inventory from "../gameobjects/Inventory";
import StressBar from "../gameobjects/StressBar";
import Utils from "../gameobjects/Utils";
import waitingRoomBackground from "../assets/WaitingRoom_Background.jpg";

class WaitingRoomScene extends Phaser.Scene {
  constructor() {
    super({ key: "WaitingRoomScene" });
  }

  preload() {
    this.load.image("waitingRoomBackground", waitingRoomBackground);
  }

  create() {
      Utils.setUpScene(this);
      Utils.setBackground(this, "waitingRoomBackground");

      // Create Inventory
      this.inventory = new Inventory(this, ["Phone", "Fidget Spinner", "Book"]);
    
      // // Create DialogueManager
      // const nurseDialogue = [
      //   "Nurse: Hello! Please have a seat and wait for the doctor.",
      //   "Nurse: The doctor will be with you shortly.",
      //   "Nurse: You can relax while you wait.",
      // ];
      // this.dialogueManager = new DialogueManager(this, nurseDialogue);
    
      // // Add Stress Bar (disabled during dialogue)
      // this.stressBar = new StressBar(this);
    
      // // Chair Area (initially hidden, will become visible later)
      // this.chairArea = this.add
      //   .text(100, 350, "Sit in the chair to relax", {
      //     fontSize: "24px",
      //     color: "#00ff00", // Green color for visibility
      //   })
      //   .setInteractive()
      //   .on("pointerdown", () => {
      //     this.stressBar.decreaseStress(5); // Sitting decreases stress
      //   })
      //   .setVisible(false); // Hide until dialogue ends
    
      // // Show the chair area once the dialogue ends
      // this.dialogueManager.isDialogueDone(() => {
      //   this.chairArea.setVisible(true); // Make the chair text visible
      // });
    
      // // Listen for inventory toggle (keydown-I)
      // this.input.keyboard.on("keydown-I", () => {
      //   if (!this.dialogueManager.dialogueText.visible) {
      //     console.log("I key pressed: toggling inventory");
      //     this.inventory.toggle(); // Only allow inventory after dialogue ends
      //   }
      // });
    
      // // Listen for phone use (keydown-P)
      // this.input.keyboard.on("keydown-P", (event) => {
      //   if (!this.dialogueManager.dialogueText.visible) {
      //     console.log("P key pressed: using phone");
      //     this.useItem("Phone");
      //   }
      // });
    
      // // Debugging: Log key presses to check if they're being registered
      // this.input.keyboard.on("keydown", (event) => {
      //   console.log("Key pressed: ", event.key);
      // });
    
  }

  showNurseMessage() {

  }

  // Use item from inventory and affect stress level
  useItem(itemName) {
    if (this.inventory.items.includes(itemName)) {
      let stressChange = 0;
      if (itemName === "Phone") {
        stressChange = 10;  // Phone increases stress
        alert("You doomscrolled! Stress increased by 10.");
      } else if (itemName === "Book") {
        stressChange = -5;  // Book decreases stress
        alert("You read a book. Stress decreased by 5.");
      } else if (itemName === "Fidget Spinner") {
        stressChange = -2;  // Fidget Spinner decreases stress slightly
        alert("You used a fidget spinner. Stress decreased by 2.");
      }

      if (stressChange !== 0) {
        if (stressChange > 0) {
          this.stressBar.increaseStress(stressChange);
        } else {
          this.stressBar.decreaseStress(Math.abs(stressChange));
        }

        // Mark the item as used (you can replace the item text with a greyed-out version)
        this.inventory.greyOutItem(itemName);
      }
    } else {
      alert(`You don't have a ${itemName}.`);
    }
  }

  update() {
    // Logic to handle game updates or additional features.
  }
}

export default WaitingRoomScene;
