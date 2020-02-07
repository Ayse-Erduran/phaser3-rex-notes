import TextureMethods from './texture/TextureMethods.js';
import DefaultGetFrameNameCallback from './utils/DefaultGetFrameNameCallback.js';

const RenderTexture = Phaser.GameObjects.RenderTexture;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class NinePatch extends RenderTexture {
    constructor(scene, x, y, width, height, key, columns, rows, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
            key = GetValue(config, 'key', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 1);
            height = GetValue(config, 'height', 1);
            key = GetValue(config, 'key', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        } else if (IsPlainObject(key)) {
            config = key;
            key = GetValue(config, 'key', undefined);
            columns = GetValue(config, 'columns', undefined);
            rows = GetValue(config, 'rows', undefined);
        }

        super(scene, x, y, width, height);
        this.columns = {};
        this.rows = {};
        this.stretchMode = {};
        this._tileSprite = undefined; // Reserved for drawing image
        this._image = undefined; // Reserved for drawing image

        this.setOrigin(0.5, 0.5);
        this.setGetFrameNameCallback(GetValue(config, 'getFrameNameCallback', undefined));
        this.setStretchMode(GetValue(config, 'stretchMode', 0));

        var baseFrameName = GetValue(config, 'baseFrame', undefined);
        this.setTexture(key, columns, rows, baseFrameName); // Also update render texture
    }

    setGetFrameNameCallback(callback) {
        if (callback === undefined) {
            callback = DefaultGetFrameNameCallback;
        }
        this.getFrameNameCallback = callback;
        return this;
    }

    get minWidth() {
        return this.columns.minWidth;
    }

    get minHeight() {
        return this.rows.minHeight;
    }

    resize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        super.resize(width, height);
        this.updateTexture();
        return this;
    }
}

Object.assign(
    NinePatch.prototype,
    TextureMethods
);

export default NinePatch;