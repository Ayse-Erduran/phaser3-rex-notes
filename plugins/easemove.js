import EaseMove from './behaviors/easemove/EaseMove.js';

var EaseMoveTo = function (gameObject, endX, endY, duration, ease, destroyMode, easeMove) {
    if (destroyMode instanceof EaseMove) {
        easeMove = destroyMode;
        destroyMode = undefined;
    }

    if (destroyMode === undefined) {
        destroyMode = false;
    }

    defaultConfig.mode = (destroyMode) ? 1 : 0;
    defaultConfig.startX = gameObject.x;
    defaultConfig.startY = gameObject.y;
    defaultConfig.endX = ParseValue(endX, defaultConfig.startX);
    defaultConfig.endY = ParseValue(endY, defaultConfig.startY);
    defaultConfig.duration = duration;
    defaultConfig.ease = (ease === undefined) ? 'Linear' : ease;

    if (easeMove === undefined) {
        easeMove = new EaseMove(gameObject, defaultConfig);
    } else {
        easeMove.resetFromJSON(defaultConfig);
    }
    easeMove.restart();

    return easeMove;
};

var EaseMoveToDestroy = function (gameObject, startX, startY, duration, ease, easeMove) {
    return EaseMoveTo(gameObject, startX, startY, duration, ease, true, easeMove);
}

var EaseMoveFrom = function (gameObject, startX, startY, duration, ease, destroyMode, easeMove) {
    if (destroyMode instanceof EaseMove) {
        easeMove = destroyMode;
        destroyMode = undefined;
    }

    if (destroyMode === undefined) {
        destroyMode = false;
    }

    defaultConfig.mode = (destroyMode) ? 1 : 0;
    defaultConfig.endX = gameObject.x;
    defaultConfig.endY = gameObject.y;
    defaultConfig.startX = ParseValue(startX, defaultConfig.endX);
    defaultConfig.startY = ParseValue(startY, defaultConfig.endY);
    defaultConfig.duration = duration;
    defaultConfig.ease = (ease === undefined) ? 'Linear' : ease;

    if (easeMove === undefined) {
        easeMove = new EaseMove(gameObject, defaultConfig);
    } else {
        easeMove.resetFromJSON(defaultConfig);
    }
    easeMove.restart();

    return easeMove;
}

var EaseMoveFromDestroy = function (gameObject, startX, startY, duration, ease, easeMove) {
    return EaseMoveFrom(gameObject, startX, startY, duration, ease, true, easeMove);
}

var ParseValue = function (propertyValue, startValue) {
    if (propertyValue === undefined) {
        return startValue;
    } else if (typeof (propertyValue) === 'number') {
        return propertyValue;
    } else {
        var op = propertyValue[0];
        var num = parseFloat(propertyValue.substr(2));
        switch (op) {
            case '+': return startValue + num;
            case '-': return startValue - num;
            case '*': return startValue * num;
            case '/': return startValue / num;
        }
    }
}

var defaultConfig = {}; // reuse this config

export { EaseMove, EaseMoveTo, EaseMoveToDestroy, EaseMoveFrom, EaseMoveFromDestroy };