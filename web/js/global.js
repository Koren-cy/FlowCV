import { app } from "/scripts/app.js";
import { api } from "/scripts/api.js";
import { $el } from "/scripts/ui.js";
import { NodeRegistry } from "./nodeRegistry.js";

const nodeRegistry = new NodeRegistry('FCV');

// 注册 FlowCV 节点
app.registerExtension({
    name: "FlowCV",
    async nodeCreated(node) {
        await nodeRegistry.handleNode(node);
    },
});

// 注册 FlowCV 编译按钮
app.registerExtension({
	name: "FlowCVcompiler",
	init() {
		$el("style", {
			parent: document.head,
		});
	},
	async setup() {
		function savePythonScript() {
			var filename = prompt("脚本名: ");
			if(filename === undefined || filename === null || filename === "") {
				return
			}
			
			app.graphToPrompt().then(async (p) => {
				const json = JSON.stringify({name: filename + ".json", workflow: JSON.stringify(p.output, null, 2)}, null, 2); 
				var response = await api.fetchApi(`/flowcvcompile`, { method: "POST", body: json });
				if(response.status == 200) {
					const blob = new Blob([await response.text()], {type: "text/python;charset=utf-8"});
					const url = URL.createObjectURL(blob);
					if(!filename.endsWith(".py")) {
						filename += ".py";
					}

					const a = $el("a", {
						href: url,
						download: filename,
						style: {display: "none"},
						parent: document.body,
					});
					a.click();
					setTimeout(function () {
						a.remove();
						window.URL.revokeObjectURL(url);
					}, 0);
				}
			});
		}

		const menu = document.querySelector(".comfy-menu");
		const separator = document.createElement("hr");

		separator.style.margin = "20px 0";
		separator.style.width = "100%";
		menu.append(separator);

		const saveButton = document.createElement("button");
		saveButton.textContent = "编译为脚本";

		saveButton.onclick = () => savePythonScript();
		menu.append(saveButton);


		// Also load to new style menu
		const dropdownMenu = document.querySelectorAll(".p-menubar-submenu ")[0];
		// Get submenu items
		const listItems = dropdownMenu.querySelectorAll("li");
		let newSetsize = listItems.length;

		const separatorMenu = document.createElement("li");
		separatorMenu.setAttribute("id", "fcv_id_8_0_" + (newSetsize - 1).toString());
		separatorMenu.setAttribute("class", "p-menubar-separator");
		separatorMenu.setAttribute("role", "separator");
		separatorMenu.setAttribute("data-pc-section", "separator");

		dropdownMenu.append(separatorMenu);

		// Adjust list items within to increase setsize
		listItems.forEach((item) => {
			// First check if it's a separator
			if(item.getAttribute("data-pc-section") !== "separator") {
				item.setAttribute("aria-setsize", newSetsize);
			}
		});

		// Here's the format of list items		
		const saveButtonText = document.createElement("li");
		saveButtonText.setAttribute("id", "fcv_id_8_0_" + newSetsize.toString());
		saveButtonText.setAttribute("class", "p-menubar-item relative");
		saveButtonText.setAttribute("role", "menuitem");
		saveButtonText.setAttribute("aria-label", "编译为脚本");
		saveButtonText.setAttribute("aria-level", "2");
		saveButtonText.setAttribute("aria-setsize", newSetsize.toString());
		saveButtonText.setAttribute("aria-posinset", newSetsize.toString());
		saveButtonText.setAttribute("data-pc-section", "item");
		saveButtonText.setAttribute("data-p-active", "false");
		saveButtonText.setAttribute("data-p-focused", "false");

		saveButtonText.innerHTML = `
			<div class="p-menubar-item-content" data-pc-section="itemcontent">
				<a class="p-menubar-item-link" tabindex="-1" aria-hidden="true" data-pc-section="itemlink" target="_blank">
					<span class="p-menubar-item-icon pi pi-book"></span>
					<span class="p-menubar-item-label">编译为脚本</span>
				</a>
			</div>
		`

		saveButtonText.onclick = () => savePythonScript();
		
		dropdownMenu.append(saveButtonText);
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