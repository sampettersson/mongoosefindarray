'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongooseFindArray = function () {
    function MongooseFindArray(array, model) {
        _classCallCheck(this, MongooseFindArray);

        if (Array.isArray(array)) {
            // remove dupes from array with spread and Set
            this.array = [].concat(_toConsumableArray(new Set(array)));
        } else {
            throw new Error("Argument 'array' not an Array.");
        }

        this.array.map(function (arrayItem) {
            return new _mongoose2.default.Types.ObjectId(arrayItem);
        });

        this.model = model;
    }

    _createClass(MongooseFindArray, [{
        key: 'query',
        value: function query() {
            var _this = this;

            return new _bluebird2.default(function (resolve, reject) {
                _this.model.find({ _id: { $in: _this.array } }, function (err, result) {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            });
        }
    }]);

    return MongooseFindArray;
}();

exports.default = MongooseFindArray;