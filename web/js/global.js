import { app } from "/scripts/app.js";
import { NodeRegistry } from "./nodeRegistry.js";

const nodeRegistry = new NodeRegistry('FCV');

app.registerExtension({
    name: "FlowCV",
    async nodeCreated(node) {
        await nodeRegistry.handleNode(node);
    },
});

// 添加全局自定义样式
const style = document.createElement("style");
style.textContent = `
    .fcv-dom-container {
        width: 100%;
    }
`;
document.head.appendChild(style);