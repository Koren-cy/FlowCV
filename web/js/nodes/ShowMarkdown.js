import { marked } from 'https://cdn.jsdelivr.net/npm/marked@12.0.0/+esm';

export default function(node) {
    // 设置节点大小
    node.size = [250, 200];

    // 创建DOM容器
    const domContainer = document.createElement("div");
    domContainer.className = "fcv-dom-container";
    domContainer.style.border = "1px solid #222";
    domContainer.style.borderRadius = "4px";
    domContainer.style.padding = "10px";
    domContainer.style.overflow = "auto";
    domContainer.style.width = "100%";
    domContainer.style.boxSizing = "border-box";
    domContainer.innerHTML = "<div></div>";
    
    // 添加DOM容器到节点
    node.addDOMWidget("dom_widget", "DOM Display", domContainer);
    
    // 节点执行完成后的回调
    node.onExecuted = function(message) {
        if (message?.data) {
            const htmlContent = marked.parse(message.data[0]);
            domContainer.innerHTML = htmlContent;
        }
    };
}