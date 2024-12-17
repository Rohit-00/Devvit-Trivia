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
// Learn more at developers.reddit.com/docs
var public_api_1 = require("@devvit/public-api");
var rules_js_1 = require("./pages/rules.js");
var leaderboard_js_1 = require("./pages/leaderboard.js");
var play_js_1 = require("./pages/play.js");
var menu_js_1 = require("./pages/menu.js");
var service_js_1 = require("./service/service.js");
var shuffleOptions_js_1 = require("./utils/shuffleOptions.js");
var themes_js_1 = require("./utils/themes.js");
var generateEventID_js_1 = require("./utils/generateEventID.js");
var customPost_js_1 = require("./pages/customPost.js");
var badges_js_1 = require("./pages/badges.js");
public_api_1.Devvit.configure({
    redditAPI: true,
    redis: true,
    http: true
});
var addQuestions = function (context, theme) { return __awaiter(void 0, void 0, void 0, function () {
    var eventId, questions, shuffledQuestions, strQuestions, i, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                eventId = generateEventID_js_1.generateRandomId(12);
                return [4 /*yield*/, context.redis.set('eventId', eventId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, service_js_1["default"].fetchQuestion({ theme: theme })];
            case 2:
                questions = _a.sent();
                shuffledQuestions = questions && shuffleOptions_js_1.processQuestionData(questions);
                strQuestions = JSON.stringify(shuffledQuestions);
                return [4 /*yield*/, context.redis.set('questions', strQuestions)];
            case 3:
                _a.sent();
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < 49)) return [3 /*break*/, 7];
                return [4 /*yield*/, context.redis.zAdd('questionNumber', { member: "" + i, score: 0 })];
            case 5:
                data = _a.sent();
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7: return [2 /*return*/];
        }
    });
}); };
var themeSelector = {
    type: 'select',
    name: 'theme',
    label: 'Select the theme',
    required: true,
    options: themes_js_1.themes
};
var myForm = public_api_1.Devvit.createForm({
    fields: [
        themeSelector
    ]
}, function (event, context) {
    // onSubmit handler
    addQuestions(context, event.values.theme[0]);
    var selectedOption = themes_js_1.themes.find(function (option) { return option.value === event.values.theme[0]; });
    var selectedLabel = selectedOption ? selectedOption.label : 'Unknown';
    context.redis.set('theme', selectedLabel);
    context.ui.showToast({ text: 'New event started!' });
});
// menu Item to start a new Event
public_api_1.Devvit.addMenuItem({
    label: 'Start a new event',
    location: 'subreddit',
    forUserType: 'moderator',
    onPress: function (_event, context) { return __awaiter(void 0, void 0, void 0, function () {
        var reddit, ui;
        return __generator(this, function (_a) {
            reddit = context.reddit, ui = context.ui;
            ui.showForm(myForm);
            return [2 /*return*/];
        });
    }); }
});
// Add a menu item to the subreddit menu for instantiating the new experience post
public_api_1.Devvit.addMenuItem({
    label: 'Add my post',
    location: 'subreddit',
    forUserType: 'moderator',
    onPress: function (_event, context) { return __awaiter(void 0, void 0, void 0, function () {
        var reddit, ui, subreddit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reddit = context.reddit, ui = context.ui;
                    return [4 /*yield*/, reddit.getCurrentSubreddit()];
                case 1:
                    subreddit = _a.sent();
                    return [4 /*yield*/, reddit.submitPost({
                            title: 'Trivia Event',
                            subredditName: subreddit.name,
                            // The preview appears while the post loads
                            preview: (React.createElement("vstack", { height: "100%", width: "100%", alignment: "middle center", backgroundColor: '#56ccf2' },
                                React.createElement("image", { url: "loadingIndicator.gif", imageWidth: 400, imageHeight: 400, description: "Rank Badge" })))
                        })];
                case 2:
                    _a.sent();
                    ui.showToast({ text: 'Created post!' });
                    return [2 /*return*/];
            }
        });
    }); }
});
// Add a post type definition
public_api_1.Devvit.addCustomPostType({
    name: 'Trivia Post',
    height: 'tall',
    render: function (_context) {
        var redis = _context.redis;
        var results = [];
        var _a = public_api_1.useAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, redis.get(_context.postId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); }), currentPost = _a.data, postLoading = _a.loading;
        var formattedData = currentPost && JSON.parse(currentPost);
        var _b = public_api_1.useState(''), page = _b[0], setPage = _b[1];
        if (currentPost && currentPost) {
            return React.createElement(customPost_js_1.CustomPost, { formattedData: formattedData, context: _context });
        }
        else {
            switch (page) {
                case 'play':
                    return React.createElement(play_js_1.PlayPage, { setPage: setPage, context: _context });
                case 'leaderboard':
                    return React.createElement(leaderboard_js_1.LeaderboardPage, { context: _context, setPage: setPage });
                case 'rules':
                    return rules_js_1.RulesPage(_context, setPage);
                case 'menu':
                    return menu_js_1.MenuPage(_context, setPage);
                case 'badge':
                    return React.createElement(badges_js_1.Badges, { context: _context, setPage: setPage });
                default:
                    return menu_js_1.MenuPage(_context, setPage);
            }
        }
    }
});
exports["default"] = public_api_1.Devvit;
