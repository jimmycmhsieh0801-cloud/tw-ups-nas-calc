const assert = require("assert");
const { calcUps } = require("./app.js");
const r = calcUps(250, 0.6, 1000);
assert.strictEqual(r.maxWatts, 600);
assert(r.minVa >= 500);
console.log("UPS_NAS_TESTS_PASSED");