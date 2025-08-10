import { app } from "/scripts/app.js";
import { NodeRegistry } from "./nodeRegistry.js";

const nodeRegistry = new NodeRegistry('FCV');

app.registerExtension({
    name: "FlowCV",
    async nodeCreated(node) {
        await nodeRegistry.handleNode(node);
    },
});

app.extensionManager.registerSidebarTab({
  id: "FCV_Tab",
  icon: "pi pi-list",
  title: "FlowCV",
  tooltip: "FlowCV 的侧边栏",
  type: "custom",
  render: (el) => {
    // 创建元素
    const container = document.createElement('div');
    container.style.padding = '10px';
    
    const notepad = document.createElement('textarea');
    notepad.style.width = '100%';
    notepad.style.height = '200px';
    notepad.style.marginBottom = '10px';
    
    // 加载已保存内容（如有）
    const savedContent = localStorage.getItem('comfyui-notes');
    if (savedContent) {
      notepad.value = savedContent;
    }
    
    // 自动保存内容
    notepad.addEventListener('input', () => {
      localStorage.setItem('comfyui-notes', notepad.value);
    });
    
    // 组装 UI
    container.appendChild(notepad);
    el.appendChild(container);
  }
});

// 添加全局自定义样式
const style = document.createElement("style");
style.textContent = `
    .fcv-dom-container {
        width: 100%;
    }
`;
document.head.appendChild(style);