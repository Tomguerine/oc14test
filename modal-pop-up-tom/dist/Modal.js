"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalPop = ModalPop;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Dialog = __importStar(require("@radix-ui/react-dialog"));
/**
 * Simple modal dialog built with Radix UI's Dialog primitives.
 */
function ModalPop({ trigger, title, children, open, onOpenChange, firstName, lastName, }) {
    const [internalOpen, setInternalOpen] = (0, react_1.useState)(false);
    const isControlled = open !== undefined;
    const currentOpen = isControlled ? open : internalOpen;
    if (!firstName || !lastName)
        return null;
    const [live, setLive] = (0, react_1.useState)('');
    return ((0, jsx_runtime_1.jsxs)(Dialog.Root, { open: currentOpen, onOpenChange: (o) => {
            if (!isControlled) {
                setInternalOpen(o);
            }
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(o);
            setLive(o ? 'Dialog opened' : 'Dialog closed');
        }, children: [trigger && (0, jsx_runtime_1.jsx)(Dialog.Trigger, { asChild: true, children: trigger }), (0, jsx_runtime_1.jsxs)(Dialog.Portal, { children: [(0, jsx_runtime_1.jsx)(Dialog.Overlay, { className: "fixed inset-0 bg-black/50" }), (0, jsx_runtime_1.jsxs)(Dialog.Content, { role: "alertdialog", "aria-modal": "true", "aria-labelledby": "modal-title", className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg", children: [title && ((0, jsx_runtime_1.jsx)(Dialog.Title, { id: "modal-title", className: "mb-2 font-bold", children: title })), (0, jsx_runtime_1.jsxs)("div", { children: [firstName, " ", lastName] }), (0, jsx_runtime_1.jsx)("div", { children: children }), (0, jsx_runtime_1.jsx)(Dialog.Close, { asChild: true, children: (0, jsx_runtime_1.jsx)("button", { className: "mt-4", "aria-label": "Close", children: "Close" }) })] })] }), (0, jsx_runtime_1.jsx)("div", { "aria-live": "assertive", className: "sr-only", children: live })] }));
}
exports.default = ModalPop;
