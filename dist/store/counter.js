"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mobx = require("../npm/mobx/lib/mobx.js");

var counterStore = (0, _mobx.observable)({
  counter: 0,
  counterStore: function counterStore() {
    this.counter++;
  },
  increment: function increment() {
    this.counter++;
  },
  decrement: function decrement() {
    this.counter--;
  },
  incrementAsync: function incrementAsync() {
    var _this = this;

    setTimeout(function () {
      _this.counter++;
    }, 1000);
  }
});
exports.default = counterStore;