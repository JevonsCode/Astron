'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mobx = require("../../../mobx/lib/mobx.js");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

var store = {};
function getStore() {
  return store;
}
function setStore(arg) {
  store = arg;
}

function isStateless(component) {
  return !(component.prototype && component.prototype._createData);
}

function observer(Component) {
  if (typeof Component !== 'function' || isStateless(Component)) {
    throw new Error("Please pass a valid component to 'observer'");
  }

  if (Component.isMobxInjector === true) {
    console.warn("Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'");
  }

  var ObserverComponent =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ObserverComponent, _Component);

    function ObserverComponent() {
      _classCallCheck(this, ObserverComponent);

      return _possibleConstructorReturn(this, _getPrototypeOf(ObserverComponent).apply(this, arguments));
    }

    _createClass(ObserverComponent, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this = this;

        var initialName = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || '<component>';
        this._reaction = new mobx.Reaction("".concat(initialName, "_").concat(Date.now()), function () {
          if (typeof _this.componentWillReact === 'function') {
            _this.componentWillReact();
          }

          _this.forceUpdate();
        });

        if (typeof _get(_getPrototypeOf(ObserverComponent.prototype), "componentWillMount", this) === 'function') {
          _get(_getPrototypeOf(ObserverComponent.prototype), "componentWillMount", this).call(this);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this._reaction.dispose();

        if (typeof _get(_getPrototypeOf(ObserverComponent.prototype), "componentWillUnmount", this) === 'function') {
          _get(_getPrototypeOf(ObserverComponent.prototype), "componentWillUnmount", this).call(this);
        }
      }
    }]);

    return ObserverComponent;
  }(Component);

  var target = ObserverComponent.prototype;
  var originCreateData = target._createData;

  target._createData = function () {
    var _this2 = this;

    var result;
    var exception;

    if (this._reaction && this._reaction instanceof mobx.Reaction) {
      this._reaction.track(function () {
        try {
          result = mobx._allowStateChanges(false, originCreateData.bind(_this2));
        } catch (e) {
          exception = e;
        }
      });
    } else {
      result = originCreateData.call(this);
    }

    if (exception) {
      throw exception;
    }

    return result;
  };

  return ObserverComponent;
}

function mapStoreToProps(grabStoresFn, props) {
  var newProps = {};

  for (var key in props) {
    if (props.hasOwnProperty(key)) {
      newProps[key] = props[key];
    }
  }

  var additionalProps = grabStoresFn(getStore() || {}, newProps) || {};

  for (var _key in additionalProps) {
    newProps[_key] = additionalProps[_key];
  }

  return newProps;
}

function createStoreInjector(grabStoresFn, injectNames, Component) {
  var displayName = 'inject-' + (Component.displayName || Component.name || Component.constructor && Component.constructor.name || 'Unknown');

  if (injectNames) {
    displayName += '-with-' + injectNames;
  }

  var Injector =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Injector, _Component);

    function Injector(props) {
      _classCallCheck(this, Injector);

      return _possibleConstructorReturn(this, _getPrototypeOf(Injector).call(this, Object.assign.apply(Object, Array.prototype.slice.call(arguments).concat([mapStoreToProps(grabStoresFn, props)]))));
    }

    _createClass(Injector, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        Object.assign(this.props, mapStoreToProps(grabStoresFn, this.props));

        if (typeof _get(_getPrototypeOf(Injector.prototype), "componentWillMount", this) === 'function') {
          _get(_getPrototypeOf(Injector.prototype), "componentWillMount", this).call(this);
        }
      }
    }]);

    return Injector;
  }(Component);

  _defineProperty(Injector, "isMobxInjector", true);

  _defineProperty(Injector, "displayName", displayName);

  var target = Injector.prototype;
  var originCreateData = target._createData;

  target._createData = function () {
    Object.assign(this.props, mapStoreToProps(grabStoresFn, this.props));
    return originCreateData.call(this);
  };

  return Injector;
}

function grabStoresByName(storeNames) {
  return function (baseStores, nextProps) {
    storeNames.forEach(function (storeName) {
      if (!(storeName in baseStores)) {
        throw new Error("MobX injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
      }

      nextProps[storeName] = baseStores[storeName];
    });
    return nextProps;
  };
}

function inject()
/* fn(stores, nextProps) or ...storeNames */
{
  var grabStoresFn;

  if (typeof arguments[0] === 'function') {
    grabStoresFn = arguments[0];
    return function (componentClass) {
      return createStoreInjector(grabStoresFn, null, componentClass);
    };
  } else {
    var storeNames = [];

    for (var i = 0; i < arguments.length; i++) {
      storeNames[i] = arguments[i];
    }

    grabStoresFn = grabStoresByName(storeNames);
    return function (componentClass) {
      return createStoreInjector(grabStoresFn, storeNames.join('-'), componentClass);
    };
  }
}

var Provider = function Provider() {
  _classCallCheck(this, Provider);
};

var index = {
  getStore: getStore,
  setStore: setStore,
  observer: observer,
  inject: inject,
  Provider: Provider
};

exports.default = index;
exports.getStore = getStore;
exports.setStore = setStore;
exports.observer = observer;
exports.inject = inject;
exports.Provider = Provider;
//# sourceMappingURL=index.js.map