'use strict';

let util = require('./util');

//Object Rules
function Rules(id, css) {
    let self = this,
        __background_re = /(?:\/\*[\s\S]*?(?:\*\/|$))|\bbackground(?:-image)?:([\s\S]*?)(?:;|$)|background-position:([\s\S]*?)(?:;|$)|background-repeat:([\s\S]*?)(?:;|$)|background-size:([\s\S]*?)(?:;|$)/gi,
        __image_url_re = /url\s*\(\s*("(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|[^)}]+)\s*\)/i,
        __support_position_re = /(0|[+-]?(?:\d*\.|)\d+px|left|right)\s+(0|[+-]?(?:\d*\.|)\d+px|top)/i,
        __support_size_re = /(\d+px)\s*(\d+px)/i, //support px only
        __repeat_re = /\brepeat-(x|y)/i,
        __sprites_re = /[?&]__sprite/i,
        __sprites_hook_ld = '<<<',
        __sprites_hook_rd = '>>>';

    //selectors
    self.id = id;
    //use image url
    self.image = '';
    self.repeat = false;
    self.size = [-1, -1];

    self._position = [0, 0];
    //image has __sprite query ?
    self._is_sprites = false;
    //x,y,z
    self._direct = 'z';
    //left or right
    self._type = null;
    self._have_position = false;

    /**
     * get position
     * @param res
     * @private
     */
    function _get_position(res) {
        if (!res[1] || !res[2]) {
            return;
        }
        self._have_position = true;
        if (['left', 'right'].indexOf(res[1]) != -1) {
            //left 和 right 都靠右排，so 类型都为`left`
            self._type = 'left';
            self._position[0] = (res[1] == 'left') ? 0 : res[1];
        } else {
            self._position[0] = parseFloat(res[1]);
        }
        self._position[1] = res[2] === 'top' ? 0 : parseFloat(res[2]);
    }

    self._css = css.replace(__background_re,
        function (m, image, position, repeat, size) {
            let res, info;
            if (image) {
                //get the url of image
                res = image.match(__image_url_re);
                if (res && res[1]) {
                    info = util.stringQuote(res[1]);
                    info = util.queryUrl(info.rest);
                    self.image = info.origin.replace(__sprites_re, '');
                    if (info.query && __sprites_re.test(info.query)) {
                        self._is_sprites = true;
                    }
                }
                //judge repeat-x or repeat-y
                res = image.match(__repeat_re);
                if (res) {
                    self.repeat = res[1].trim();
                    self._direct = res[1].trim();
                }
                //if set position then get it.
                res = image.match(__support_position_re);
                if (res) {
                    _get_position(res);
                }
            }
            if (position) {
                //if use background-position, get it.
                res = position.match(__support_position_re);
                if (res) {
                    _get_position(res);
                }
            }
            if (repeat) {
                res = repeat.match(__repeat_re);
                if (res) {
                    self.repeat = res[1].trim();
                    self._direct = res[1];
                }
            }

            if (size) {
                res = size.match(__support_size_re);
                if (res) {
                    self.size[0] = parseFloat(res[1]);
                    self.size[1] = parseFloat(res[2]);
                }
            }
            return __sprites_hook_ld + m + __sprites_hook_rd;
        }
    );
}

Rules.prototype = {
    getId: function () {
        return this.id;
    },
    getImageUrl: function () {
        return this.image;
    },
    get2xImageUrl: function () {
        let dotIndex = this.image.lastIndexOf('.');
        return this.image.substr(0, dotIndex) + '@2x' + this.image.substr(dotIndex);
    },
    get3xImageUrl: function () {
        let dotIndex = this.image.lastIndexOf('.');
        return this.image.substr(0, dotIndex) + '@3x' + this.image.substr(dotIndex);
    },
    getCss: function () {
        let __sprites_hook_re = /<<<[\s\S]*?>>>/g,
            ret = this._css;
        //if use sprites, replace background-image + background-position to space;
        if (this.isSprites()) {
            ret = ret.replace(__sprites_hook_re, '').trim();
            //压缩会去掉最后一个;所以最前面加一个;
            let pre_pad = '';
            if (ret.length > 0 && ret.charAt(ret.length - 1) != ';') {
                pre_pad = ';';
            }
            if (this.repeat) {
                ret += pre_pad + 'background-repeat: repeat-' + this.repeat;
            } else {
                ret += pre_pad + 'background-repeat: no-repeat;';
            }
        }
        return ret;
    },
    isSprites: function () {
        return this._is_sprites;
    },
    setType: function (type) {
        this._type = type;
    },
    getType: function () {
        return this._type;
    },
    getDirect: function () {
        return this._direct;
    },
    getPosition: function () {
        return this._position;
    },
    havePosition: function () {
        return this._have_position;
    }
};

module.exports = Rules;