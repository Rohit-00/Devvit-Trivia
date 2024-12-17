"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PlayPage = void 0;
var public_api_1 = require("@devvit/public-api");
var button_js_1 = require("../components/button.js");
var options_js_1 = require("../components/options.js");
var modal_js_1 = require("../components/modal.js");
var countdown_js_1 = require("../components/countdown.js");
var attempts_js_1 = require("../components/attempts.js");
var processAttemptedQuestions_js_1 = require("../utils/processAttemptedQuestions.js");
public_api_1.Devvit.configure({
    realtime: true,
    redis: true,
    redditAPI: true
});
exports.PlayPage = function (_a) {
    var context = _a.context, setPage = _a.setPage;
    var question;
    var eventId = public_api_1.useAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.redis.get('eventId')];
                case 1: return [2 /*return*/, _a.sent()]; //get current event
            }
        });
    }); }).data;
    var userQuestions = public_api_1.useAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, userName, avatar, userData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.reddit.getCurrentUser()];
                case 1:
                    data = _a.sent();
                    userName = data === null || data === void 0 ? void 0 : data.username;
                    return [4 /*yield*/, context.reddit.getSnoovatarUrl(userName)];
                case 2:
                    avatar = _a.sent();
                    userData = {
                        userName: userName,
                        avatar: avatar
                    };
                    return [2 /*return*/, userData];
            }
        });
    }); }).data;
    var key = userQuestions && eventId && 'attempts' + userQuestions.userName + eventId;
    var data = public_api_1.useAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
        var event, user, username;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.redis.get('eventId')];
                case 1:
                    event = _a.sent();
                    return [4 /*yield*/, context.reddit.getCurrentUser()];
                case 2:
                    user = _a.sent();
                    username = user === null || user === void 0 ? void 0 : user.username;
                    return [4 /*yield*/, context.redis.get('attempts' + username + event)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    }); }).data;
    var formatted = data && JSON.parse(data);
    var _b = public_api_1.useAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.redis.zRange('questionNumber', 0, 0, { by: 'score' })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }), questionNumber = _b.data, questionNumberLoading = _b.loading;
    var answeredQuestions = public_api_1.useAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.redis.zRange('questionNumber', 1, 2, { by: 'score' })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }).data;
    var isInPrevAttempts = formatted && questionNumber && formatted.filter(function (element) { return element === questionNumber[0].member; });
    var largest = formatted && Math.max.apply(Math, formatted.map(Number));
    // const questionIndex : any = data && questionNumber&& isInPrevAttempts === null || isInPrevAttempts === undefined ? questionNumber && questionNumber[0].member: questionNumber && largest ?  questionNumber[largest+1].member:questionNumber&&questionNumber[largest+1].member;
    var questionIndex = questionNumber && isInPrevAttempts && isInPrevAttempts ? questionNumber && largest ? questionNumber[largest + 1].member : questionNumber && questionNumber[largest + 1].member : questionNumber && questionNumber[0].member;
    var _c = public_api_1.useAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.redis.get('questions')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }), questionsData = _c.data, questionsLoading = _c.loading, error = _c.error;
    var setQuestion = public_api_1.useAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!questionNumber)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, context.redis.zAdd('questionNumber', { member: "" + questionIndex, score: 2 })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, {
        depends: data
    }).data;
    //  const {data} =  useAsync(async() => {
    //   const data = await context.redis.get(key) as string
    //   if(data){
    //   return data as string}
    //   else return null
    //  }, 
    //  {
    //   depends: { key, userQuestions }
    // })
    // data && console.log(data)
    var formattedQuestion = questionsData && JSON.parse(questionsData);
    question = questionIndex && formattedQuestion && atob(formattedQuestion.results[questionIndex].question);
    var _d = public_api_1.useState(null), selected = _d[0], setSelected = _d[1];
    var _e = public_api_1.useState(''), answer = _e[0], setAnswer = _e[1];
    var _f = public_api_1.useState(''), checkAnswer = _f[0], setCheckAnswer = _f[1];
    var _g = public_api_1.useState(false), modal = _g[0], setModal = _g[1];
    // Prepare options for the question
    var allOptions = questionIndex && questionsData
        ? formattedQuestion.results[questionIndex].incorrect_answers.concat(formattedQuestion.results[questionIndex].correct_answer)
        : [];
    var options = [];
    questionsData &&
        allOptions.forEach(function (answer) {
            options.push({ option: atob(answer), background: 'white', text: 'black' });
        });
    var postData = formattedQuestion && questionIndex && userQuestions && {
        question: atob(formattedQuestion.results[questionIndex].question),
        answer: atob(formattedQuestion.results[questionIndex].correct_answer),
        avatar: userQuestions.avatar
    };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var allAttempts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(questionsData && questionNumber && userQuestions && eventId && key &&
                        answer === atob(formattedQuestion.results[questionIndex].correct_answer))) return [3 /*break*/, 4];
                    setModal(true);
                    setCheckAnswer('right');
                    return [4 /*yield*/, context.redis.zAdd('questionNumber', { member: "" + questionIndex, score: 1 })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, context.redis.zIncrBy('ranking', userQuestions.userName, 1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, context.redis.zIncrBy('attempts', userQuestions.userName + eventId, 1)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 4:
                    setModal(true);
                    setCheckAnswer('wrong');
                    allAttempts = processAttemptedQuestions_js_1.processAttemptedQuestions(formatted, questionIndex);
                    return [4 /*yield*/, context.redis.zAdd('questionNumber', { member: "" + questionIndex, score: 0 })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, context.redis.set(key, JSON.stringify(allAttempts))];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, context.redis.zIncrBy('attempts', userQuestions.userName + eventId, 1)]; //attempts
                case 7:
                    _a.sent(); //attempts
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("blocks", null,
        React.createElement("zstack", { height: "100%", width: "100%" },
            React.createElement("vstack", { backgroundColor: "#56CCF2", height: "100%", width: "100%", alignment: "center", grow: true },
                questionsLoading && React.createElement("vstack", { height: "5px", width: '100%' }),
                questionsData && React.createElement(countdown_js_1.Countdown, { handleSubmit: handleSubmit }),
                React.createElement("spacer", null),
                React.createElement("hstack", { width: "100%", alignment: "middle" },
                    React.createElement("hstack", { width: "30%", alignment: "start" },
                        React.createElement("spacer", null),
                        React.createElement("spacer", null)),
                    React.createElement("hstack", { width: "40%", alignment: "center" },
                        React.createElement(attempts_js_1.Attempts, { context: context })),
                    React.createElement("hstack", { alignment: "end", width: "30%" },
                        React.createElement("zstack", { alignment: "start top" },
                            React.createElement("vstack", { width: "100%", height: "100%" },
                                React.createElement("spacer", { height: "3px" }),
                                React.createElement("hstack", { width: "100%", height: "100%" },
                                    React.createElement("spacer", { width: "3px" }),
                                    React.createElement("hstack", { height: "35px", width: "35px", backgroundColor: "black", cornerRadius: "small" }))),
                            React.createElement("hstack", { backgroundColor: "#D93A00", padding: "xsmall", cornerRadius: "small", border: "thick", borderColor: "black", onPress: function () { return handleSubmit(); } },
                                React.createElement("icon", { name: "close-fill", color: "white", size: "large" }))),
                        React.createElement("spacer", null))),
                React.createElement("spacer", null),
                questionsLoading && (React.createElement("text", { overflow: "ellipsis", color: "white", size: "xxlarge", alignment: "center", wrap: true, width: "100%", weight: "bold" }, "Loading")),
                questionsData && (React.createElement("text", { overflow: "ellipsis", color: "white", size: "xxlarge", alignment: "center", wrap: true, width: "100%", weight: "bold" }, question)),
                React.createElement("spacer", null),
                questionsData &&
                    React.createElement(options_js_1["default"], { options: options, selected: selected, onSelect: function (index, option) {
                            setSelected(index);
                            setAnswer(option);
                        } }),
                React.createElement("spacer", { size: "small" }),
                questionsData && questionNumber && (React.createElement(button_js_1.Button, { label: "Submit", background: "#D93A00", textColor: "white", onClick: handleSubmit }))),
            modal &&
                React.createElement(modal_js_1["default"], { answer: checkAnswer, onClose: function () { return setPage(''); }, onRetry: function () { return setPage(''); }, onPost: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var subreddit, post;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, context.reddit.getCurrentSubreddit()];
                                case 1:
                                    subreddit = _a.sent();
                                    return [4 /*yield*/, context.reddit.submitPost({
                                            title: (answeredQuestions && answeredQuestions.length + 1) + "/30 - answered by " + userQuestions.userName,
                                            subredditName: subreddit.name,
                                            // The preview appears while the post loads
                                            preview: (React.createElement("vstack", { height: "100%", width: "100%", alignment: "middle center", backgroundColor: '#56ccf2' },
                                                React.createElement("image", { url: "loadingIndicator.gif", imageWidth: 400, imageHeight: 400, description: "Rank Badge" })))
                                        })];
                                case 2:
                                    post = _a.sent();
                                    return [4 /*yield*/, context.redis.set(post.id, JSON.stringify(postData))];
                                case 3:
                                    _a.sent();
                                    setPage('');
                                    return [2 /*return*/];
                            }
                        });
                    }); } }))));
};
