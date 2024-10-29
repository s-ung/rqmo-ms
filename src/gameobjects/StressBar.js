class StressBar {
    constructor(scene, initialStress = 20) {
        this.scene = scene;
        this.maxStress = 100;
        this.currentStress = initialStress;
        this.barWidth = 300;
        this.barHeight = 30;

        // Stress bar background (fill and stroke)
        this.barBackground = this.scene.add.graphics();

        // Stress bar fill (the part that changes as stress changes)
        this.barFill = this.scene.add.graphics();

        // Stress label on the left side of the bar with a black stroke
        this.stressLabel = this.scene.add.text(54, 55, 'Stress', {
            fontSize: '18px',
            color: '#ffffff',
            align: 'left',
        }).setStroke('#000000', 2);  // Black stroke with a thickness of 2

        // Stress value (e.g., "20/100") on the right side of the bar with a black stroke
        this.stressText = this.scene.add.text(50 + this.barWidth - 80, 55, this.currentStress + '/' + this.maxStress, {
            fontSize: '18px',
            color: '#ffffff',
            align: 'right',
        }).setStroke('#000000', 2);  // Black stroke with a thickness of 2

        // Initial update of the bar
        this.updateBar();
    }

    // Increase stress level
    increaseStress(amount) {
        this.createFloatingText(amount, false); // Create green floating text for increase
        this.currentStress = Math.min(this.maxStress, this.currentStress + amount);
        this.updateBar();

        if (this.currentStress >= this.maxStress) this.triggerLoss();
    }

    // Decrease stress level
    decreaseStress(amount) {
        this.createFloatingText(amount, true); // Create red floating text for decrease
        this.currentStress = Math.max(0, this.currentStress - amount);
        this.updateBar();
    }

    // Method to create floating text for stress change
    createFloatingText(amount, isDecrease) {
        const changeText = (isDecrease ? '-' : '+') + amount;
        const color = isDecrease ? '#00ff00' : '#ff0000'; // Green for decrease, red for increase
        const floatingText = this.scene.add.text(50 + this.barWidth + 20, 55, changeText, {
            fontSize: '18px',
            color: color,
        }).setStroke('#000000', 2);  // Add a black stroke to the text

        // Animate the floating text downwards and fade it out
        this.scene.tweens.add({
            targets: floatingText,
            y: floatingText.y + 30, // Move it down by 30 pixels
            alpha: 0, // Fade out
            duration: 2000, // 2 seconds duration
            ease: 'Power2',
            onComplete: () => {
                floatingText.destroy(); // Remove the text after animation
            }
        });
    }

    // Update the stress bar and text
    updateBar() {
        const stressPercentage = this.currentStress / this.maxStress;
        const fillWidth = this.barWidth * stressPercentage;

        // Clear previous bar fill and background
        this.barFill.clear();
        this.barBackground.clear();

        // Determine the color based on the stress level
        let fillColor;
        if (stressPercentage <= 0.33) {
            // Low stress: Yellow to Orange transition (0-33%)
            const color = Phaser.Display.Color.Interpolate.ColorWithColor(
                { r: 255, g: 255, b: 0 }, // Yellow
                { r: 255, g: 165, b: 0 }, // Orange
                33, // Total steps (0-33%)
                stressPercentage * 100 // Current step
            );
            fillColor = Phaser.Display.Color.GetColor(color.r, color.g, color.b);
        } else if (stressPercentage <= 0.66) {
            // Mid stress: Orange to Red transition (34-66%)
            const color = Phaser.Display.Color.Interpolate.ColorWithColor(
                { r: 255, g: 165, b: 0 }, // Orange
                { r: 255, g: 0, b: 0 }, // Red
                33, // Total steps (34-66%)
                (stressPercentage - 0.33) * 100 // Adjust step range
            );
            fillColor = Phaser.Display.Color.GetColor(color.r, color.g, color.b);
        } else {
            // High stress: Solid Red (67-100%)
            fillColor = Phaser.Display.Color.GetColor(255, 0, 0); // Red
        }

        // Draw the filled part of the stress bar (draw this first)
        this.barFill.fillStyle(fillColor, 1);
        this.barFill.fillRoundedRect(52, 52, fillWidth, this.barHeight - 4, 10); // Rounded corners with radius of 10

        // Draw the bar background with stroke (draw this after the fill)
        this.barBackground.lineStyle(4, 0x000000, 1); // Black stroke, 4px thickness
        this.barBackground.fillStyle(0x666666, 1); // Gray background
        this.barBackground.fillRoundedRect(50, 50, this.barWidth, this.barHeight, 10); // Rounded corners with radius of 10
        this.barBackground.strokeRoundedRect(50, 50, this.barWidth, this.barHeight, 10); // Apply stroke with the same rounded corners

        // Update the stress value text (e.g., "20/100")
        this.stressText.setText(this.currentStress + '/' + this.maxStress);
    }

    // Trigger the loss scenario if stress exceeds the limit
    triggerLoss() {
        alert('Stress maxed out! You lost!');
        this.scene.scene.start('LosingScene'); // Transition to the LosingScene
    }
}

export default StressBar;
