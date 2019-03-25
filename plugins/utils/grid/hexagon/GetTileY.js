import CONST from './const.js';

const ODD_R = CONST.ODD_R;
const EVEN_R = CONST.EVEN_R;
const ODD_Q = CONST.ODD_Q;
const EVEN_Q = CONST.EVEN_Q;

var GetTileY = function (worldX, worldY) {
    worldY -= this.y;
    switch (this.mode) {
        case ODD_R:
        case EVEN_R:
            worldY /= 0.75;
            break;

        case ODD_Q:
            var tileX = this.getTileX(worldX, worldY);
            if (tileX & 1) {
                worldY -= this._halfHeight;
            }
            break;

        case EVEN_Q:
            var tileX = this.getTileX(worldX, worldY);
            if (tileX & 1) {
                worldY += this._halfHeight;
            }
            break;
    }
    var tileY = Math.round(worldY / this.height);
    return tileY;
}

export default GetTileY;