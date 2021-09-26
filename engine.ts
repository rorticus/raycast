const mapWidth = 24;
const mapHeight = 24;

const map = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

interface SliceCalculations {
    rayX: number;
    rayY: number;
    rayDirX: number;
    rayDirY: number;
    mapX: number;
    mapY: number;
    perpWallDist: number;
    side: number;
    lineHeight: number;
    wallStart: number;
    wallEnd: number;
    wallX: number;
}

interface CastSprite {
    x: number;
    y: number;
    texture: Image;
}

const castSprites: CastSprite[] = [];

castSprites.push({
    x: 20.5, y: 11.5, texture: projectImages.greyStone
});

const zBuffer: number[] = [];

let posX = 22, posY = 12;  //x and y start position
let dirX = -1, dirY = 0; //initial direction vector
let planeX = 0, planeY = 0.66; //the 2d raycaster version of camera plane

let time = 0; //time of current frame
let oldTime = 0; //time of previous frame

// Add your code here
function draw() {
    const w = screen.width;
    const h = screen.height;

    screen.fillRect(0, h / 2, w, h / 2, 2);

    const results: SliceCalculations = {
        mapX: 0,
        mapY: 0,
        perpWallDist: 0,
        rayDirX: 0,
        rayDirY: 0,
        rayX: 0,
        rayY: 0,
        side: 0,
        lineHeight: 0,
        wallStart: 0,
        wallEnd: 0,
        wallX: 0
    };

    for (let x = 0; x < w; x++) {
        calculateSlice(x, w, h, results);
        drawWallSlice(x, w, h, results);
        // drawFloorSlice(x, w, h, results);
    }

    drawSprites(w, h);    
}

function calculateSlice(x: number, w: number, h: number, calcs: SliceCalculations) {
    //calculate ray position and direction
    let cameraX = 2 * x / w - 1; //x-coordinate in camera space
    let rayDirX = dirX + planeX * cameraX;
    let rayDirY = dirY + planeY * cameraX;

    //which box of the map we're in
    let mapX = Math.floor(posX);
    let mapY = Math.floor(posY);

    //length of ray from current position to next x or y-side
    let sideDistX;
    let sideDistY;

    //length of ray from one x or y-side to next x or y-side
    let deltaDistX = Math.abs(1 / rayDirX);
    let deltaDistY = Math.abs(1 / rayDirY);
    let perpWallDist;

    //what direction to step in x or y-direction (either +1 or -1)
    let stepX;
    let stepY;

    let hit = 0; //was there a wall hit?
    let side; //was a NS or a EW wall hit?

    //calculate step and initial sideDist
    if (rayDirX < 0) {
        stepX = -1;
        sideDistX = (posX - mapX) * deltaDistX;
    }
    else {
        stepX = 1;
        sideDistX = (mapX + 1.0 - posX) * deltaDistX;
    }
    if (rayDirY < 0) {
        stepY = -1;
        sideDistY = (posY - mapY) * deltaDistY;
    }
    else {
        stepY = 1;
        sideDistY = (mapY + 1.0 - posY) * deltaDistY;
    }

    //perform DDA
    while (hit == 0) {
        //jump to next map square, OR in x-direction, OR in y-direction
        if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            mapX += stepX;
            side = 0;
        }
        else {
            sideDistY += deltaDistY;
            mapY += stepY;
            side = 1;
        }
        //Check if ray has hit a wall
        if (map[mapY * mapWidth + mapX] > 0) { hit = 1; }
    }

    //Calculate distance projected on camera direction (Euclidean distance will give fisheye effect!)
    if (side == 0) perpWallDist = (mapX - posX + (1 - stepX) / 2) / rayDirX;
    else perpWallDist = (mapY - posY + (1 - stepY) / 2) / rayDirY;

    //Calculate height of line to draw on screen
    const lineHeight = Math.floor(h / perpWallDist);

    calcs.perpWallDist = perpWallDist;
    calcs.side = side;
    calcs.rayDirX = rayDirX;
    calcs.rayDirY = rayDirY;
    calcs.mapX = mapX;
    calcs.mapY = mapY;
    calcs.lineHeight = lineHeight;

    //calculate lowest and highest pixel to fill in current stripe
    calcs.wallStart = -lineHeight / 2 + h / 2;
    calcs.wallEnd = calcs.wallStart + lineHeight;

    if (side == 0) {
        calcs.wallX = posY + perpWallDist * rayDirY;
    } else {
        calcs.wallX = posX + perpWallDist * rayDirX;
    }

    calcs.wallX -= Math.floor(calcs.wallX);
}

function drawWallSlice(x: number, w: number, h: number, calcs: SliceCalculations) {
    const {
        lineHeight,
        mapX,
        mapY,
        side,
        perpWallDist,
        rayDirX,
        rayDirY,
        wallStart: drawStart,
        wallEnd: drawEnd,
        wallX
    } = calcs;

    //choose wall color
    const texNum = map[mapY * mapWidth + mapX];
    let texture: Image;

    switch (texNum) {
        default:
            texture = projectImages.greyStone;
            break;
    }

    let texX = Math.floor(wallX * texture.width);
    if (side == 0 && rayDirX > 0) {
        texX = texture.width - texX - 1;
    }
    if (side == 1 && rayDirY < 0) {
        texX = texture.width - texX - 1;
    }

    screen.blitRow(x, drawStart, texture, texX, lineHeight);

    zBuffer[x] = perpWallDist;
}

function drawFloorSlice(x: number, w: number, h: number, calcs: SliceCalculations) {
    const { side, rayDirX, rayDirY, mapX, mapY, wallX, perpWallDist, wallEnd } = calcs;

    //FLOOR CASTING (vertical version, directly after drawing the vertical wall stripe for the current x)
    let floorXWall, floorYWall; //x, y position of the floor texel at the bottom of the wall

    //4 different wall directions possible
    if (side == 0 && rayDirX > 0) {
        floorXWall = mapX;
        floorYWall = mapY + wallX;
    }
    else if (side == 0 && rayDirX < 0) {
        floorXWall = mapX + 1.0;
        floorYWall = mapY + wallX;
    }
    else if (side == 1 && rayDirY > 0) {
        floorXWall = mapX + wallX;
        floorYWall = mapY;
    }
    else {
        floorXWall = mapX + wallX;
        floorYWall = mapY + 1.0;
    }

    let distWall, distPlayer, currentDist;

    distWall = perpWallDist;
    const texture = projectImages.greyStone;

    // draw the floor from drawEnd to the bottom of the screen
    for (let y = wallEnd + 1; y < h; y++) {
        currentDist = h / (2.0 * y - h); //you could make a small lookup table for this instead

        const weight = (currentDist) / (distWall);

        const currentFloorX = weight * floorXWall + (1.0 - weight) * posX;
        const currentFloorY = weight * floorYWall + (1.0 - weight) * posY;

        let floorTexX, floorTexY;
        floorTexX = Math.floor(currentFloorX * texture.width) % texture.width;
        floorTexY = Math.floor(currentFloorY * texture.height) % texture.height;

        const c = texture.getPixel(floorTexX, floorTexY);

        // floor
        screen.setPixel(x, y, c);
    }
}

function drawSprites(w: number, h: number) {
    for (let i = 0; i < castSprites.length; i++) {
        const spriteX = castSprites[i].x - posX;
        const spriteY = castSprites[i].y - posY;
        const texture = projectImages.hamburger;//castSprites[i].texture;

        const invDet = 1.0 / (planeX * dirY - dirX * planeY); //required for correct matrix multiplication

        const transformX = invDet * (dirY * spriteX - dirX * spriteY);
        const transformY = invDet * (-planeY * spriteX + planeX * spriteY); //this is actually the depth inside the screen, that what Z is in 3D

        const yOffset = 64 / transformY;

        const spriteScreenX = Math.floor((w / 2) * (1 + transformX / transformY));

        //calculate width of the sprite
        const spriteWidth = Math.abs(Math.floor(texture.data.length / (transformY)));
        let drawStartX = Math.floor(-spriteWidth / 2 + spriteScreenX);
        if (drawStartX < 0) drawStartX = 0;
        let drawEndX = Math.floor(spriteWidth / 2 + spriteScreenX);
        if (drawEndX >= w) drawEndX = w - 1;

        //loop through every vertical stripe of the sprite on screen
        for (let stripe = drawStartX; stripe < drawEndX; stripe++) {
            const texX = Math.floor((stripe - (-spriteWidth / 2 + spriteScreenX)) * texture.data.length / spriteWidth);
            //     //the conditions in the if are:
            //     //1) it's in front of camera plane so you don't see things behind you
            //     //2) it's on the screen (left)
            //     //3) it's on the screen (right)
            //     //4) ZBuffer, with perpendicular distance
            
            if (texture.data[texX] && transformY > 0 && stripe > 0 && stripe < w && transformY < zBuffer[stripe]) {
                const vMoveScreen = Math.floor(texture.offsets[texX] / transformY);

                //calculate height of the sprite on screen
                const spriteHeight = Math.abs(Math.floor(texture.heights[texX] / (transformY))); //using 'transformY' instead of the real distance prevents fisheye
                //calculate lowest and highest pixel to fill in current stripe
                let drawStartY = h / 2 + vMoveScreen + yOffset;

                screen.blitRow(stripe, drawStartY, texture.data[Math.floor(texX)], texX, spriteHeight);
            }
        }
    }
}