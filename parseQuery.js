module.exports = function(queryString) {
    var arr = queryString.split(/&|=/);
    var params = new Params();

    for (var i = 0; i < arr.length; i = i + 2) {
        params.add(arr[i], arr[i + 1]);
    }

    return params.getParams();
}

function Params() {
}
Params.prototype = {

    /**
     * Keep all params
     * @type Object
     */
    _data : undefined,
    /**
     * Add param
     *
     * @param key string
     * @param value any
     */
    add : function(key, value) {
        var path = key.split(/\[/);

        for (var i = 1; i < path.length; i++) {
            path[i] = path[i].slice(0, path[i].length-1)
        }

        this._data = this._addItem(path, this._data, value);
    },

    /**
     * Get params object
     *
     * @returns {Object|_data}
     */
    getParams : function() {
        return this._data || {};
    },

    _addItem : function(path, parent, value) {
        var key = path.shift();
        if (parent === undefined) {
            parent = this._getItemByKey(key);
        }
        if(path[0]) {
            parent[key] = this._addItem(path, parent[key], value);
        } else {
            parent = this._addByInstance(parent, key, value);
        }
        return parent;
    },

    _getItemByKey : function(key) {
        var numberKey = Number(key);
        if (!isNaN(numberKey) || key == '') {
            return [];
        } else {
            return {};
        }
    },

    _addByInstance : function(object, key, value) {
        if(object instanceof Array) {
            object = this._addToArray(object, key, value);
        } else if (object instanceof Object) {
            object = this._addToObject(object, key, value);
        } else if (typeof object == 'string') {
            object = this._addToArray([object], key, value);
        }
        return object;
    },

    _addToArray : function(array, key, value) {
        var numberKey = Number(key);
        var result = array;
        if (key == '') {
            result.push(value);
        } else if (isNaN(numberKey)) {
            result = {};
            for (var i = 0; i < array.length; i++) {
                result[i] = array[i];
                result[key] = value;
            }
        } else {
            if (array[numberKey]) {
                result[numberKey] = this._addByInstance(array[numberKey], '', value);
            } else {
                result[numberKey] = value;
            }
        }

        return result;
    },

    _addToObject : function(object, key, value) {
        if (!key) {
            key = Object.keys(object).length;
        }
        if (object[key]) {
            object[key] = this._addByInstance(object[key], '', value);
        } else {
            object[key] = value;
        }
        return object;
    }

}
