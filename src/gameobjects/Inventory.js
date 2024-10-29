export default class Inventory {
    static #instance;

    constructor() {
        this.name = 'Player'
        this.diagnosticScore = 0
        this.stressScore = 0
    }

    static  getInstance() {
        if (!Inventory.#instance) {
            Inventory.#instance = new Inventory();
        }
        return Inventory.#instance;
    }
}
// import Phaser from 'phaser';

// class Inventory {
//     constructor(scene, initialItems = []) {
//         this.scene = scene;
//         this.items = initialItems.map(item => ({
//             name: item,
//             used: false
//         })); // Each item is now an object with a 'used' flag
//         this.isOpen = false;

//         this.panelX = 50;
//         this.panelY = 100;
//         this.panelWidth = 500;
//         this.panelHeight = 200;
//         this.itemSpacing = 40; // Height of each inventory item row
//         this.itemStartY = this.panelY + 10; // Y-coordinate for the first item (just below the panel top)

//         // Inventory Panel (moved down by 50 pixels)
//         this.panel = this.scene.add.graphics();
//         this.panel.fillStyle(0x222222, 0.8);
//         this.panel.fillRect(this.panelX, this.panelY, this.panelWidth, this.panelHeight); // Adjusted Y-coordinates
//         this.panel.setDepth(10); // Set depth to ensure it's on top of other elements
//         this.panel.setVisible(false);

//         // Inventory Text (moved down by 50 pixels)
//         this.inventoryText = this.scene.add.text(60, this.panelY + 10, 'Inventory:', {
//             fontSize: '24px',
//             color: '#ffffff'
//         });
//         this.inventoryText.setDepth(10);
//         this.inventoryText.setVisible(false); // Initially hidden

//         // Create the toggle button (Inventory button on screen)
//         this.inventoryButton = this.scene.add.text(550, 20, '[I] Inventory', {
//             fontSize: '24px',
//             backgroundColor: '#444',
//             color: '#ffffff',
//             padding: { left: 10, right: 10, top: 5, bottom: 5 }
//         }).setInteractive();
//         this.inventoryButton.setDepth(10);

//         // Toggle inventory on button click
//         this.inventoryButton.on('pointerdown', () => {
//             if (!this.scene.isDialogueActive) {
//                 this.toggle();
//             }
//         });

//         // Toggle inventory with keyboard input ('I' key)
//         this.scene.input.keyboard.on('keydown-I', () => {
//             if (!this.scene.isDialogueActive) {
//                 this.toggle();
//             }
//         });

//         // Add event listener for using items
//         this.scene.input.on('pointerdown', (pointer) => {
//             if (this.isOpen && this.pointerInsidePanel(pointer)) {
//                 this.handleItemClick(pointer);
//             }
//         });
//     }

//     // Method to check if a pointer click is inside the panel bounds
//     pointerInsidePanel(pointer) {
//         return (
//             pointer.x >= this.panelX &&
//             pointer.x <= this.panelX + this.panelWidth &&
//             pointer.y >= this.panelY &&
//             pointer.y <= this.panelY + this.panelHeight
//         );
//     }

//     // Method to toggle inventory panel visibility
//     toggle() {
//         this.isOpen = !this.isOpen;
//         this.panel.setVisible(this.isOpen);
//         this.inventoryText.setVisible(this.isOpen);

//         if (this.isOpen) {
//             this.updateInventoryDisplay();
//         }
//     }

//     // Method to hide the inventory button (for example, during dialogue)
//     hideInventoryButton() {
//         this.inventoryButton.setVisible(false);
//     }

//     // Method to show the inventory button (after dialogue ends)
//     showInventoryButton() {
//         this.inventoryButton.setVisible(true);
//     }

//     // Method to add an item to the inventory
//     addItem(itemName) {
//         this.items.push({ name: itemName, used: false });
//         this.updateInventoryDisplay();
//     }

//     // Handle clicking on inventory items
//     handleItemClick(pointer) {
//         const clickedY = pointer.y; // Get the Y-coordinate of the click
//         const clickedIndex = Math.floor((clickedY - this.itemStartY) / this.itemSpacing); // Adjust based on item start Y and spacing

//         // Check if clickedIndex is valid
//         if (clickedIndex >= 0 && clickedIndex < this.items.length) {
//             const item = this.items[clickedIndex];

//             if (!item.used) {
//                 this.useItem(item.name);
//                 item.used = true; // Mark item as used
//                 this.updateInventoryDisplay();
//             }
//         }
//     }

//     // Method to use an item (apply its effect on stress)
//     useItem(itemName) {
//         switch (itemName) {
//             case 'Phone':
//                 this.scene.stressBar.increaseStress(30); // Doomscrolling increases stress
//                 break;
//             case 'Fidget Spinner':
//                 this.scene.stressBar.decreaseStress(20); // Using the spinner decreases stress
//                 break;
//             case 'Fantasy Book':
//                 this.scene.stressBar.decreaseStress(15); // Reading decreases stress
//                 break;
//             default:
//                 break;
//         }
//     }

//     // Method to update inventory display text
//     updateInventoryDisplay() {
//         let itemDisplay = 'Inventory:\n';

//         this.items.forEach((item, index) => {
//             if (item.used) {
//                 itemDisplay += `${index + 1}. ${item.name} (Used)\n`; // Grey out used items
//             } else {
//                 itemDisplay += `${index + 1}. ${item.name}\n`; // Display available items
//             }
//         });

//         this.inventoryText.setText(itemDisplay);
//     }
// }

// export default Inventory;