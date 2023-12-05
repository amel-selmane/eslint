/**
 * @fileoverview Tests for id-length rule.
 * @author Burak Yigit Kaya
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/id-length"),
    RuleTester = require("../../../lib/rule-tester/flat-rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const tooShortError = { messageId: "tooShort", type: "Identifier" };
const tooShortErrorPrivate = { messageId: "tooShortPrivate", type: "PrivateIdentifier" };
const tooLongError = { messageId: "tooLong", type: "Identifier" };
const tooLongErrorPrivate = { messageId: "tooLongPrivate", type: "PrivateIdentifier" };

ruleTester.run("id-length", rule, {
    valid: [
        "var xyz;",
        "var xy = 1;",
        "function xyz() {};",
        "function xyz(abc, de) {};",
        "var obj = { abc: 1, de: 2 };",
        "var obj = { 'a': 1, bc: 2 };",
        "var obj = {}; obj['a'] = 2;",
        "abc = d;",
        "try { blah(); } catch (err) { /* pass */ }",
        "var handler = function ($e) {};",
        "var _a = 2",
        "var _ad$$ = new $;",
        "var xyz = new ΣΣ();",
        "unrelatedExpressionThatNeedsToBeIgnored();",
        "var obj = { 'a': 1, bc: 2 }; obj.tk = obj.a;",
        "var query = location.query.q || '';",
        "var query = location.query.q ? location.query.q : ''",
        { code: "let {a: foo} = bar;", languageOptions: { ecmaVersion: 6 } },
        { code: "let foo = { [a]: 1 };", languageOptions: { ecmaVersion: 6 } },
        { code: "let foo = { [a + b]: 1 };", languageOptions: { ecmaVersion: 6 } },
        { code: "var x = Foo(42)", options: [{ min: 1 }] },
        { code: "var x = Foo(42)", options: [{ min: 0 }] },
        { code: "foo.$x = Foo(42)", options: [{ min: 1 }] },
        { code: "var lalala = Foo(42)", options: [{ max: 6 }] },
        { code: "for (var q, h=0; h < 10; h++) { console.log(h); q++; }", options: [{ exceptions: ["h", "q"] }] },
        { code: "(num) => { num * num };", languageOptions: { ecmaVersion: 6 } },
        { code: "function foo(num = 0) { }", languageOptions: { ecmaVersion: 6 } },
        { code: "class MyClass { }", languageOptions: { ecmaVersion: 6 } },
        { code: "class Foo { method() {} }", languageOptions: { ecmaVersion: 6 } },
        { code: "function foo(...args) { }", languageOptions: { ecmaVersion: 6 } },
        { code: "var { prop } = {};", languageOptions: { ecmaVersion: 6 } },
        { code: "var { [a]: prop } = {};", languageOptions: { ecmaVersion: 6 } },
        { code: "var { a: foo } = {};", options: [{ min: 3 }], languageOptions: { ecmaVersion: 6 } },
        { code: "var { prop: foo } = {};", options: [{ max: 3 }], languageOptions: { ecmaVersion: 6 } },
        { code: "var { longName: foo } = {};", options: [{ min: 3, max: 5 }], languageOptions: { ecmaVersion: 6 } },
        { code: "var { foo: a } = {};", options: [{ exceptions: ["a"] }], languageOptions: { ecmaVersion: 6 } },
        { code: "var { a: { b: { c: longName } } } = {};", languageOptions: { ecmaVersion: 6 } },
        { code: "({ a: obj.x.y.z } = {});", options: [{ properties: "never" }], languageOptions: { ecmaVersion: 6 } },
        { code: "import something from 'y';", languageOptions: { ecmaVersion: 6, sourceType: "module" } },
        { code: "export var num = 0;", languageOptions: { ecmaVersion: 6, sourceType: "module" } },
        { code: "({ prop: obj.x.y.something } = {});", languageOptions: { ecmaVersion: 6 } },
        { code: "({ prop: obj.longName } = {});", languageOptions: { ecmaVersion: 6 } },
        { code: "var obj = { a: 1, bc: 2 };", options: [{ properties: "never" }] },
        { code: "var obj = { [a]: 2 };", options: [{ properties: "never" }], languageOptions: { ecmaVersion: 6 } },
        { code: "var obj = {}; obj.a = 1; obj.bc = 2;", options: [{ properties: "never" }] },
        { code: "({ prop: obj.x } = {});", options: [{ properties: "never" }], languageOptions: { ecmaVersion: 6 } },
        { code: "var obj = { aaaaa: 1 };", options: [{ max: 4, properties: "never" }] },
        { code: "var obj = {}; obj.aaaaa = 1;", options: [{ max: 4, properties: "never" }] },
        { code: "({ a: obj.x.y.z } = {});", options: [{ max: 4, properties: "never" }], languageOptions: { ecmaVersion: 6 } },
        { code: "({ prop: obj.xxxxx } = {});", options: [{ max: 4, properties: "never" }], languageOptions: { ecmaVersion: 6 } },
        { code: "var arr = [i,j,f,b]", languageOptions: { ecmaVersion: 6 } },
        { code: "function foo([arr]) {}", languageOptions: { ecmaVersion: 6 } },
        { code: "var {x} = foo;", options: [{ properties: "never" }], languageOptions: { ecmaVersion: 6 } },
        { code: "var {x, y: {z}} = foo;", options: [{ properties: "never" }], languageOptions: { ecmaVersion: 6 } },
        { code: "let foo = { [a]: 1 };", options: [{ properties: "always" }], languageOptions: { ecmaVersion: 6 } },
        { code: "let foo = { [a + b]: 1 };", options: [{ properties: "always" }], languageOptions: { ecmaVersion: 6 } },
        { code: "function BEFORE_send() {};", options: [{ min: 3, max: 5, exceptionPatterns: ["^BEFORE_"] }] },
        { code: "function BEFORE_send() {};", options: [{ min: 3, max: 5, exceptionPatterns: ["^BEFORE_", "send$"] }] },
        { code: "function BEFORE_send() {};", options: [{ min: 3, max: 5, exceptionPatterns: ["^BEFORE_", "^A", "^Z"] }] },
        { code: "function BEFORE_send() {};", options: [{ min: 3, max: 5, exceptionPatterns: ["^A", "^BEFORE_", "^Z"] }] },
        { code: "var x = 1 ;", options: [{ min: 3, max: 5, exceptionPatterns: ["[x-z]"] }] },

        // Class Fields
        {
            code: "class Foo { #xyz() {} }",
            languageOptions: { ecmaVersion: 2022 }
        },
        {
            code: "class Foo { xyz = 1 }",
            languageOptions: { ecmaVersion: 2022 }
        },
        {
            code: "class Foo { #xyz = 1 }",
            languageOptions: { ecmaVersion: 2022 }
        },
        {
            code: "class Foo { #abc() {} }",
            options: [{ max: 3 }],
            languageOptions: { ecmaVersion: 2022 }
        },
        {
            code: "class Foo { abc = 1 }",
            options: [{ max: 3 }],
            languageOptions: { ecmaVersion: 2022 }
        },
        {
            code: "class Foo { #abc = 1 }",
            options: [{ max: 3 }],
            languageOptions: { ecmaVersion: 2022 }
        },

        // Identifier consisting of two code units
        {
            code: "var 𠮟 = 2",
            options: [{ min: 1, max: 1 }],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var 葛󠄀 = 2", // 2 code points but only 1 grapheme
            options: [{ min: 1, max: 1 }],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var a = { 𐌘: 1 };",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "(𐌘) => { 𐌘 * 𐌘 };",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "class 𠮟 { }",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "class F { 𐌘() {} }",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "class F { #𐌘() {} }",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 2022
            }
        },
        {
            code: "class F { 𐌘 = 1 }",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 2022
            }
        },
        {
            code: "class F { #𐌘 = 1 }",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 2022
            }
        },
        {
            code: "function f(...𐌘) { }",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "function f([𐌘]) { }",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "var [ 𐌘 ] = a;",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "var { p: [𐌘]} = {};",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "function f({𐌘}) { }",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "var { 𐌘 } = {};",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "var { p: 𐌘} = {};",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "({ prop: o.𐌘 } = {});",
            options: [{ min: 1, max: 1 }],
            languageOptions: {
                ecmaVersion: 6
            }
        }
    ],
    invalid: [
        { code: "var x = 1;", errors: [tooShortError] },
        { code: "var x;", errors: [tooShortError] },
        { code: "obj.e = document.body;", errors: [tooShortError] },
        { code: "function x() {};", errors: [tooShortError] },
        { code: "function xyz(a) {};", errors: [tooShortError] },
        { code: "var obj = { a: 1, bc: 2 };", errors: [tooShortError] },
        { code: "try { blah(); } catch (e) { /* pass */ }", errors: [tooShortError] },
        { code: "var handler = function (e) {};", errors: [tooShortError] },
        { code: "for (var i=0; i < 10; i++) { console.log(i); }", errors: [tooShortError] },
        { code: "var j=0; while (j > -10) { console.log(--j); }", errors: [tooShortError] },
        { code: "var [i] = arr;", errors: [tooShortError], languageOptions: { ecmaVersion: 6 } },
        { code: "var [,i,a] = arr;", errors: [tooShortError, tooShortError], languageOptions: { ecmaVersion: 6 } },
        { code: "function foo([a]) {}", errors: [tooShortError], languageOptions: { ecmaVersion: 6 } },
        {
            code: "var _$xt_$ = Foo(42)",
            options: [{ min: 2, max: 4 }],
            errors: [
                tooLongError
            ]
        },
        {
            code: "var _$x$_t$ = Foo(42)",
            options: [{ min: 2, max: 4 }],
            errors: [
                tooLongError
            ]
        },
        {
            code: "var toString;",
            options: [{ max: 5 }],
            errors: [
                tooLongError
            ]
        },
        {
            code: "(a) => { a * a };",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "function foo(x = 0) { }",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "class x { }",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "class Foo { x() {} }",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "function foo(...x) { }",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "function foo({x}) { }",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "function foo({x: a}) { }",
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "a", min: 2 },
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "function foo({x: a, longName}) { }",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "function foo({ longName: a }) {}",
            options: [{ min: 3, max: 5 }],
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "function foo({ prop: longName }) {};",
            options: [{ min: 3, max: 5 }],
            errors: [
                tooLongError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "function foo({ a: b }) {};",
            options: [{ exceptions: ["a"] }],
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "b", min: 2 },
                    line: 1,
                    column: 19,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var hasOwnProperty;",
            options: [{ max: 10, exceptions: [] }],
            errors: [
                {
                    messageId: "tooLong",
                    data: { name: "hasOwnProperty", max: 10 },
                    line: 1,
                    column: 5,
                    type: "Identifier"
                }
            ]
        },
        {
            code: "function foo({ a: { b: { c: d, e } } }) { }",
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "d", min: 2 },
                    line: 1,
                    column: 29,
                    type: "Identifier"
                },
                {
                    messageId: "tooShort",
                    data: { name: "e", min: 2 },
                    line: 1,
                    column: 32,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { x} = {};",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { x: a} = {};",
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "a", min: 2 },
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { a: a} = {};",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { prop: a } = {};",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { longName: a } = {};",
            options: [{ min: 3, max: 5 }],
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { prop: [x] } = {};",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { prop: [[x]] } = {};",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { prop: longName } = {};",
            options: [{ min: 3, max: 5 }],
            errors: [
                {
                    messageId: "tooLong",
                    data: { name: "longName", max: 5 },
                    line: 1,
                    column: 13,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { x: a} = {};",
            options: [{ exceptions: ["x"] }],
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "a", min: 2 },
                    line: 1,
                    column: 10,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { a: { b: { c: d } } } = {};",
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "d", min: 2 },
                    line: 1,
                    column: 20,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { a: { b: { c: d, e } } } = {};",
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "d", min: 2 },
                    line: 1,
                    column: 20,
                    type: "Identifier"
                },
                {
                    messageId: "tooShort",
                    data: { name: "e", min: 2 },
                    line: 1,
                    column: 23,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { a: { b: { c, e: longName } } } = {};",
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "c", min: 2 },
                    line: 1,
                    column: 17,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { a: { b: { c: d, e: longName } } } = {};",
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "d", min: 2 },
                    line: 1,
                    column: 20,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var { a, b: { c: d, e: longName } } = {};",
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "a", min: 2 },
                    line: 1,
                    column: 7,
                    type: "Identifier"
                },
                {
                    messageId: "tooShort",
                    data: { name: "d", min: 2 },
                    line: 1,
                    column: 18,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "import x from 'y';",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
            code: "export var x = 0;",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
            code: "({ a: obj.x.y.z } = {});",
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "z", min: 2 },
                    line: 1,
                    column: 15,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "({ prop: obj.x } = {});",
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "x", min: 2 },
                    line: 1,
                    column: 14,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        { code: "var x = 1;", options: [{ properties: "never" }], errors: [tooShortError] },
        {
            code: "var {prop: x} = foo;",
            options: [{ properties: "never" }],
            errors: [
                {
                    messageId: "tooShort",
                    data: { name: "x", min: 2 },
                    line: 1,
                    column: 12,
                    type: "Identifier"
                }
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var foo = {x: prop};",
            options: [{ properties: "always" }],
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "function BEFORE_send() {};",
            options: [{ min: 3, max: 5 }],
            errors: [
                tooLongError
            ]
        },
        {
            code: "function NOTMATCHED_send() {};",
            options: [{ min: 3, max: 5, exceptionPatterns: ["^BEFORE_"] }],
            errors: [
                tooLongError
            ]
        },
        {
            code: "function N() {};",
            options: [{ min: 3, max: 5, exceptionPatterns: ["^BEFORE_"] }],
            errors: [
                tooShortError
            ]
        },

        // Class Fields
        {
            code: "class Foo { #x() {} }",
            errors: [
                tooShortErrorPrivate
            ],
            languageOptions: { ecmaVersion: 2022 }
        },
        {
            code: "class Foo { x = 1 }",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 2022 }
        },
        {
            code: "class Foo { #x = 1 }",
            errors: [
                tooShortErrorPrivate
            ],
            languageOptions: { ecmaVersion: 2022 }
        },
        {
            code: "class Foo { #abcdefg() {} }",
            options: [{ max: 3 }],
            errors: [
                tooLongErrorPrivate
            ],
            languageOptions: { ecmaVersion: 2022 }
        },
        {
            code: "class Foo { abcdefg = 1 }",
            options: [{ max: 3 }],
            errors: [
                tooLongError
            ],
            languageOptions: { ecmaVersion: 2022 }
        },
        {
            code: "class Foo { #abcdefg = 1 }",
            options: [{ max: 3 }],
            errors: [
                tooLongErrorPrivate
            ],
            languageOptions: { ecmaVersion: 2022 }
        },

        // Identifier consisting of two code units
        {
            code: "var 𠮟 = 2",
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var 葛󠄀 = 2", // 2 code points but only 1 grapheme
            errors: [
                tooShortError
            ],
            languageOptions: { ecmaVersion: 6 }
        },
        {
            code: "var myObj = { 𐌘: 1 };",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "(𐌘) => { 𐌘 * 𐌘 };",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "class 𠮟 { }",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "class Foo { 𐌘() {} }",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "class Foo1 { #𐌘() {} }",
            errors: [
                tooShortErrorPrivate
            ],
            languageOptions: {
                ecmaVersion: 2022
            }
        },
        {
            code: "class Foo2 { 𐌘 = 1 }",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 2022
            }
        },
        {
            code: "class Foo3 { #𐌘 = 1 }",
            errors: [
                tooShortErrorPrivate
            ],
            languageOptions: {
                ecmaVersion: 2022
            }
        },
        {
            code: "function foo1(...𐌘) { }",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "function foo([𐌘]) { }",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "var [ 𐌘 ] = arr;",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "var { prop: [𐌘]} = {};",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "function foo({𐌘}) { }",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "var { 𐌘 } = {};",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "var { prop: 𐌘} = {};",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        },
        {
            code: "({ prop: obj.𐌘 } = {});",
            errors: [
                tooShortError
            ],
            languageOptions: {
                ecmaVersion: 6
            }
        }
    ]
});
