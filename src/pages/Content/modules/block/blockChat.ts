import {blockList} from "./blockStamp";
import {sleep} from "../../../../util";

export const initBlockChat = async () => {
  // repeatedly waits until targetNode are found
  let targetNode: HTMLElement | null = null;
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
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            node.querySelectorAll<HTMLImageElement>(".chat-line__message--emote").forEach(emote => {
              // if emote to be blocked exists, delete a chat
              if (blockList.get().includes(emote.alt)) {
                node.remove();
                return;
              }
            })
          }
        })
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
