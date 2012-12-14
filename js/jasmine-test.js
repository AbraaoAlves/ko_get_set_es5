///<reference path="knockout-2.2.0.js" />
///<reference path="ko-es5.js" />

describe("describe", function () {
    it('should define an enumerable property', function () {
        var foo = {};

        ko.utils.defineObservableProperty(foo, 'name');

        var descriptor = Object.getOwnPropertyDescriptor(foo, 'name');
        expect(descriptor.enumerable).toBeTruthy();
        expect(descriptor.configurable).toBeTruthy();
        expect(descriptor.get instanceof Function).toBeTruthy();
        expect(descriptor.set instanceof Function).toBeTruthy();
    });
});
