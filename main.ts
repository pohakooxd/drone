enum RadioMessage {
    forward = 16348,
    backword = 47720,
    backward = 28651,
    up = 483,
    down = 21844,
    left = 14947,
    right = 32391,
    message2 = 1435,
    message1 = 49434
}
radio.onReceivedMessage(RadioMessage.backward, function () {
    Drones.Move_action(Drones.Directionoptions.Backward, 30.48)
})
input.onButtonPressed(Button.A, function () {
    radio.sendMessage(RadioMessage.backward)
})
input.onPinPressed(TouchPin.P2, function () {
    radio.sendMessage(RadioMessage.down)
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
})
radio.onReceivedMessage(RadioMessage.left, function () {
    Drones.Move_action(Drones.Directionoptions.Left, 15.24)
})
input.onButtonPressed(Button.B, function () {
    radio.sendMessage(RadioMessage.forward)
})
input.onPinPressed(TouchPin.P1, function () {
    radio.sendMessage(RadioMessage.up)
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
})
radio.onReceivedMessage(RadioMessage.forward, function () {
    Drones.Move_action(Drones.Directionoptions.Forward, 30.48)
})
radio.onReceivedMessage(RadioMessage.right, function () {
    Drones.Move_action(Drones.Directionoptions.Right, 15.24)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendMessage(RadioMessage.message1)
})
radio.onReceivedMessage(RadioMessage.up, function () {
    Drones.Move_action(Drones.Directionoptions.Up, 15.24)
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
})
radio.onReceivedMessage(RadioMessage.down, function () {
    Drones.Move_action(Drones.Directionoptions.Down, 15.24)
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
})
radio.onReceivedMessage(RadioMessage.message2, function () {
    basic.showLeds(`
        . # . # .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    basic.pause(2000)
    basic.clearScreen()
})
// take off, makes a box.
radio.onReceivedMessage(RadioMessage.message1, function () {
    Drones.Basic_action(Drones.Basicoptions.Takeoff)
    basic.pause(2000)
    Drones.Move_action(Drones.Directionoptions.Forward, 100)
    Drones.Rotation_action(Drones.Angleoptions.Right, 100)
    Drones.Move_action(Drones.Directionoptions.Forward, 100)
    Drones.Rotation_action(Drones.Angleoptions.Right, 100)
    Drones.Move_action(Drones.Directionoptions.Forward, 100)
    Drones.Rotation_action(Drones.Angleoptions.Right, 100)
    Drones.Move_action(Drones.Directionoptions.Forward, 100)
    Drones.Basic_action(Drones.Basicoptions.Landing)
    basic.showLeds(`
        . # . # .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    radio.sendMessage(RadioMessage.message2)
    basic.pause(2000)
    basic.clearScreen()
})
Drones.initModule(Drones.Runmodes.Master)
basic.forever(function () {
    if (input.compassHeading() < 150) {
        radio.sendMessage(RadioMessage.right)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        basic.pause(500)
        basic.clearScreen()
        if (input.compassHeading() > 210) {
            radio.sendMessage(RadioMessage.left)
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `)
            basic.pause(500)
            basic.clearScreen()
        }
    }
})
basic.forever(function () {
    if (input.lightLevel() > 195) {
        for (let index = 0; index < 4; index++) {
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `)
            basic.pause(500)
            basic.showLeds(`
                . . . . .
                . # . # .
                . . # . .
                . # . # .
                . . . . .
                `)
            basic.pause(500)
        }
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        basic.pause(500)
        basic.clearScreen()
        Drones.Urgent_action(Drones.Urgentoptions.Emergency_stop)
    }
})
