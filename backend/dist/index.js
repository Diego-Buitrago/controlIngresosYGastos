"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from 'cors';
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Configurar CORS
/* app.use(cors({
  origin: 'http://example.com',
  credentials: true,
})); */
// Usar Morgan para registrar solicitudes
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(errorHandler_1.default);
// app.use('/', routes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
