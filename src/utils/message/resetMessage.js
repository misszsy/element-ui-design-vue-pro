import { Message } from "element-ui";

//用于解决多次点击按钮的出现多个提示框的问题

let messageInstance = null;

const resetMessage = (options) => {
    if (messageInstance) {
        messageInstance.close();
    }
    messageInstance = Message(options);
};

["error", "success", "info", "waring"].forEach(type => {
    resetMessage[type] = options => {
        if (typeof options === "string") {
            options = {
                message: options
            }
        }
        options.type = type;
        return resetMessage(options);
    }
})

export const message = resetMessage;
