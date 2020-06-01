export class Settings {




    static getIcon() {
        return 'fa-shoe-prints';
    }

    static getHudColumn() {
        return game.settings.get('followme', 'column') == 0 ? '.col.left' : '.col.right';
    }

    static getHudTopBottom() {
        return game.settings.get('followme', 'topbottom') == 0 ? 'top' : 'bottom';
    }

    static registerSettings() {

        game.settings.register('followme', 'column', {
            name: 'HUD Column',
            scope: 'world',
            config: true,
            type: Number,
            default: 0,
            choices: ['Left', 'Right']
        });

        game.settings.register('followme', 'topbottom', {
            name: 'HUD Top/Bottom',
            scope: 'world',
            config: true,
            type: Number,
            default: 0,
            choices: ['Top', 'Bottom']
        });
    }

}