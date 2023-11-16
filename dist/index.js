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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resend_1 = require("resend");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const resend = new resend_1.Resend("re_4Eoit6Pr_7QFW31KGwuiDJEN8JKDQvBnD");
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["geecorelimited@gmail.com"],
            subject: "hello world",
            html: "<strong>it works!</strong>",
        });
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
app.post('/mail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { receivers, subject, sender, message } = req.body;
    if (!receivers) {
        res.status(500).send('Receiver not defined');
        return;
    }
    if (receivers.length < 1) {
        res.status(500).send('Minimum of 1 receiver is required');
        return;
    }
    if (!subject) {
        res.status(500).send('Subject is required');
        return;
    }
    if (!sender) {
        res.status(500).send('Sender is required');
        return;
    }
    if (!message) {
        res.status(500).send('Message is required');
        return;
    }
    try {
        const data = yield resend.emails.send({
            from: sender,
            to: receivers,
            subject: subject,
            html: message,
        });
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
app.listen(3600, () => {
    console.log("Listening on http://localhost:3600");
});
