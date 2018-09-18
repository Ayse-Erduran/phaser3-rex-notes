import DeltaTileXYToNeighbor from './DeltaTileXYToNeighbor.js';
import GetParity from './GetParity.js';

var GetNeighborTileDir = function (srcTileXY, neighborTileXY) {
    var parity = GetParity(this.mode, tileX, tileY);
    var deltaTileXYToDirMap = DeltaTileXYToNeighbor[this.mode][parity];

    var deltaTileX = neighborTileXY.x - srcTileXY.x;
    var deltaTileY = neighborTileXY.y - srcTileXY.y;    
    if (deltaTileXYToDirMap.hasOwnProperty(deltaTileX)) {
        var xEntry = deltaTileXYToDirMap[deltaTileX]
        if (xEntry.hasOwnProperty(deltaTileY)) {
            return xEntry[deltaTileY];
        }
    }
    return null;
}
export default GetNeighborTileDir;