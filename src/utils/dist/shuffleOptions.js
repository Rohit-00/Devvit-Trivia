"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.processQuestionData = exports.shuffleArray = void 0;
exports.shuffleArray = function (array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        _a = [array[randomIndex], array[i]], array[i] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
};
function processQuestionData(data) {
    return data.results.map(function (question) {
        // Combine correct answer with incorrect answers
        var options = question.incorrect_answers
            ? __spreadArrays(question.incorrect_answers, [question.correct_answer]) : [question.correct_answer];
        // Shuffle the options
        var shuffledOptions = exports.shuffleArray(options);
        // Remove `incorrect_answers` field and add `options`
        var incorrect_answers = question.incorrect_answers, rest = __rest(question, ["incorrect_answers"]);
        return __assign(__assign({}, rest), { options: shuffledOptions });
    });
}
exports.processQuestionData = processQuestionData;
