image.setPalette(palettes.raycasthex);

let lastFrame;
let thisFrame = game.runtime();

game.onUpdate(() => {
    lastFrame = thisFrame;
    thisFrame = game.runtime();
    const frameTime = (thisFrame - lastFrame) / 1000.0; //frameTime is the time this frame has taken, in seconds

    //speed modifiers
    const moveSpeed = frameTime * 5.0; //the constant value is in squares/second
    const rotSpeed = frameTime * 3.0; //the constant value is in radians/second

    if (controller.up.isPressed()) {
        if (map[Math.floor(posX + dirX * moveSpeed) + Math.floor(posY) * mapWidth] == 0) {
            posX += dirX * moveSpeed;
        }

        if (map[Math.floor(posX) + Math.floor(posY + dirY * moveSpeed) * mapWidth] == 0) {
            posY += dirY * moveSpeed;
        }
    }

    //move backwards if no wall behind you
    if (controller.down.isPressed()) {
        if (map[Math.floor(posX - dirX * moveSpeed) + Math.floor(posY) * mapWidth] == 0) {
            posX -= dirX * moveSpeed
        }
        if (map[Math.floor(posX) + Math.floor(posY - dirY * moveSpeed) * mapWidth] == 0) {
            posY -= dirY * moveSpeed;
        }
    }
    //rotate to the right
    if (controller.right.isPressed()) {
        //both camera direction and camera plane must be rotated
        const oldDirX = dirX;
        dirX = dirX * Math.cos(-rotSpeed) - dirY * Math.sin(-rotSpeed);
        dirY = oldDirX * Math.sin(-rotSpeed) + dirY * Math.cos(-rotSpeed);
        const oldPlaneX = planeX;
        planeX = planeX * Math.cos(-rotSpeed) - planeY * Math.sin(-rotSpeed);
        planeY = oldPlaneX * Math.sin(-rotSpeed) + planeY * Math.cos(-rotSpeed);
    }
    //rotate to the left
    if (controller.left.isPressed()) {
        //both camera direction and camera plane must be rotated
        const oldDirX = dirX;
        dirX = dirX * Math.cos(rotSpeed) - dirY * Math.sin(rotSpeed);
        dirY = oldDirX * Math.sin(rotSpeed) + dirY * Math.cos(rotSpeed);
        const oldPlaneX = planeX;
        planeX = planeX * Math.cos(rotSpeed) - planeY * Math.sin(rotSpeed);
        planeY = oldPlaneX * Math.sin(rotSpeed) + planeY * Math.cos(rotSpeed);
    }
});

game.onPaint(() => {
    draw();
});