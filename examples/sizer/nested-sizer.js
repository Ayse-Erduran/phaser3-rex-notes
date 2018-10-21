import SizerPlugin from 'rexPlugins/sizer-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var x = 400,
            y = 300,
            minWidth = 500,
            minHeight = undefined,
            table = {
                title: 'Title/Title/Title',
                data: [{
                        icon: Random(0, 0xffffff),
                        name: 'AAA',
                        content: 'Hello',
                    },
                    {
                        icon: Random(0, 0xffffff),
                        name: 'BBBB',
                        content: 'World',
                    },
                    {
                        icon: Random(0, 0xffffff),
                        name: 'CCCCC',
                        content: 'Goodbye',
                    },
                ]
            };

        var sizer = getTable(this, x, y, minWidth, minHeight, table);
        sizer.drawBounds(this.add.graphics());
    }

    update() {}
}

var getRow = function (scene, data) {
    var background = scene.add.rectangle(0, 0, 2, 40, 0x888888);
    var icon = scene.add.rectangle(0, 0, 30, 30, data.icon);
    var nameLabel = scene.add.text(0, 0, data.name, {
        fontSize: '24px',
        color: 'white'
    });
    var contentLabel = scene.add.text(0, 0, data.content, {
        fontSize: '24px',
        color: 'white'
    });
    var sizer = scene.add.rexSizer({
            orientation: 'x',
        })
        .add(background, -1) // Extend width equal to sizer width
        .add(icon) // Minimum size
        .add(nameLabel, 2, 'left')
        .add(contentLabel, 5, 'left');

    return sizer;
}

var getTable = function (scene, x, y, width, height, table) {
    var title = scene.add.text(0, 0, table.title, {
        fontSize: '32px',
        color: 'white'
    });

    var sizer = scene.add.rexSizer(x, y, width, height, {
            orientation: 'y',
        })
        .add(title);

    var padding = {
        top: 10,
        //bottom: 10,
        left: 10,
        right: 10,
    }
    var data = table.data;
    for (var i = 0, cnt = data.length; i < cnt; i++) {
        sizer.add(getRow(scene, data[i]), 0, 'left', padding);
    }
    sizer.layout();
    return sizer;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexSizer',
            plugin: SizerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);