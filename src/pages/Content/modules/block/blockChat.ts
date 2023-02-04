import {blockList} from "./blockStamp";
import {sleep} from "../../../../util";

  let targetNode: HTMLElement | null = null;

  const hideChats = (nodes: NodeList | NodeListOf<HTMLElement>, blockEmotes: string[]) => {
    nodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        node.querySelectorAll<HTMLImageElement>(".chat-line__message--emote").forEach(emote => {
          // if emote to be blocked exists, hide a chat
          if (blockEmotes.includes(emote.alt)) {
            node.classList.add("hidden-chat");
            return;
          }
        })
      }
    })

  }

export const initBlockChat = async () => {
  // repeatedly waits until targetNode are found
  while (targetNode === null) {
    await sleep(1000)
    targetNode = document.querySelector("div.chat-scrollable-area__message-container[data-test-selector='chat-scrollable-area__message-container']");
  }
// Select the node that will be observed for mutations

// Options for the observer (which mutations to observe)
  const config = {attributes: true, childList: true, subtree: true} satisfies MutationObserverInit;

// Callback function to execute when mutations are observed
  const observeChats: MutationCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        hideChats(mutation.addedNodes, blockList.get());
      }
    }
  };

// Create an observer instance linked to the callback function
  const observer = new MutationObserver(observeChats);

// Start observing the target node for configured mutations
  if (targetNode) {
    observer.observe(targetNode, config);
  }
}

export const hideChatsByEmote = (emoteName:string) => {
  if(!targetNode) return;
  hideChats(targetNode.childNodes, [emoteName])
}
