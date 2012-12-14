(function(factory, global) {
	if (global.define && global.define.amd) {
		global.define(['ko'], factory);
	} else {
		factory(global.ko);
	}
})(function(ko) {
var propOver;
	var defineProperty = function(type, obj, prop, def) {
		if (obj == null || typeof obj != 'object' || typeof prop != 'string') {
			throw new Error('invalid arguments passed');
		}

		if (Object.prototype.toString.call(def) === '[object Array]' && type === 'observable') {
			type = 'observableArray';
		}

		var obv = ko[type](def);
		(function(propOver){
			Object.defineProperty(obj, prop, {
				set : function(value) {
					methodOver = Object.getOwnPropertyDescriptor(this, 'set_' + propOver)
					if(methodOver)
						methodOver.value(value);
					obv(value)
				},
				get : function() {
					return obv()
				},
				enumerable : true,
				configurable : true
			});
		})(prop);

		Object.defineProperty(obj, '_' + prop, {
			get : function() {
				return obv
			},
			enumerable : false
		});
	};


	ko.utils.defineObservableProperty = defineProperty.bind(null, 'observable');
	ko.utils.defineComputedProperty = defineProperty.bind(null, 'computed');

	ko.observableModel = function(defaults) {
		for (var prop in defaults) {
			
			if (defaults.hasOwnProperty(prop)) {
				if (defaults[prop] != null && typeof defaults[prop] == 'object' && Object.prototype.toString.call(defaults[prop]) !== '[object Array]') {
					// should this also be an observable property?
					this[prop] = new ko.observableModel(defaults[prop]);
				} else if (!defaults[prop] || !ko.isSubscribable(defaults[prop])) {
						ko.utils.defineObservableProperty(this, prop, defaults[prop]);
				} else {
					this[prop] = defaults[prop];
				}
			}
		}
	};

}, this); 