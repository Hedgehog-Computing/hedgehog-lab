import {Mat} from './hedgehog_runtime';


test('Create a Mat object', () => {
    var A = new Mat(1);
    var B = new Mat([1]);
    var C = new Mat([1, 2]);
    var D = new Mat([[1, 2]]);
    var E = new Mat([[1, 2], [3, 4], [5, 6]]);

    expect(A.val).toEqual([[1]]);
    expect(B.val).toEqual([[1]]);
    expect(C.val).toEqual([[1, 2]]);
    expect(D.val).toEqual([[1, 2]]);
    expect(E.val).toEqual([[1, 2], [3, 4], [5, 6]]);
    expect([E.rows, E.cols]).toEqual([3, 2]);
});

test('Create a Mat object with corner case input', () => {
    // TODO: define the behaviors of the following situations
    var A = new Mat();
    var B = new Mat('1');
    var C = new Mat([]);
    var D = new Mat([[]]);
    var E = new Mat(['1']);
    var F = new Mat([['1']]);
    var G = new Mat(NaN);
    var H = new Mat(Infinity);
    var I = new Mat([[1], []]);
    var J = new Mat([[1], [2, 3]]);
    var K = new Mat([1, [2, 3]]);
    var L = new Mat([[[1]]]);

    expect(A.val).toEqual(null); // now: []
    expect(B.val).toEqual(null); // now: []
    expect(C.val).toEqual(null); // now: [[]]
    expect(D.val).toEqual(null); // now: [[]]
    expect(E.val).toEqual(null); // now: [["1"]]
    expect(F.val).toEqual(null); // now: [["1"]]
    expect(G.val).toEqual([[NaN]]); // now: [[NaN]]
    expect(H.val).toEqual([[Infinity]]); // now: [[Infinity]]
    expect(I.val).toEqual(null); // now: [[1], []]
    expect(J.val).toEqual(null); // now: [[1], [2, 3]]
    expect(K.val).toEqual(null); // now: [[1, [2, 3]]]
    expect(L.val).toEqual(null); // now: [[[1]]]
});
