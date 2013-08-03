module.exports = function(queryString) {
    var arr = queryString.split(/&|=/);
    var params = new Params();

    for (var i = 0; i < arr.length; i = i + 2) {
        params.add(arr[i], arr[i + 1]);
    }

    return params.getParams();
}

function Params() {
    this._data = {}
}
Params.prototype = {
    _data : null,
    add : function(key, value) {
        if (/\[\d?\]$/.test(key)) {
            this._addArray(key, value);
        } else if (/\[\D+\]$/.test(key)) {
            this._addObjectKey(key, value);
        } else if(this._data[key] != undefined) {
            this._addExist(key, value);
        } else {
            this._addSimple(key, value);
        }
    },

    getParams : function() {
        return this._data;
    },

    _addSimple : function(key, value) {
        this._data[key] = value;
    },

    _addArray : function(key, value) {
       key = key.slice(0, key.length - 2);
       this._data[key] = this._data[key] || [];

        this._data[key].push(value);
    },

    _addObjectKey : function() {

    },

    _addExist : function(key, value) {

    }
}