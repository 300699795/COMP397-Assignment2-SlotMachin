var objects;
(function (objects) {
    var Button = (function () {
        function Button(path, x, y) {
            this._x = x;
            this._y = y;
            this._image = new createjs.Bitmap(path);
            this._image.x = this._x;
            this._image.y = this._y;

            this._image.addEventListener("mouseover", this._buttonOver);
            this._image.addEventListener("mouseout", this._buttonOut);
        }
        // PUBLIC PROPERTIES
        Button.prototype.setX = function (x) {
            this._x = x;
        };

        Button.prototype.getX = function () {
            return this._x;
        };

        Button.prototype.setY = function (y) {
            this._y = y;
        };

        Button.prototype.getY = function () {
            return this._y;
        };

        Button.prototype.getImage = function () {
            return this._image;
        };
        Button.prototype.getText = function () {
            return this._text;
        };

        // PRIVATE EVENT HANDLERS
        Button.prototype._buttonOut = function (event) {
            event.currentTarget.alpha = 1; // 100% Alpha
        };

        Button.prototype._buttonOver = function (event) {
            event.currentTarget.alpha = 0.5;
        };
        return Button;
    })();
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map
