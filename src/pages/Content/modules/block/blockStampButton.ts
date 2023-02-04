import {blockList} from "./blockStamp";
import {sleep} from "../../../../util";
import {hideChatsByEmote} from "./blockChat";

const getButtonClassName = (isBlocked: boolean): string =>
  isBlocked ? "block-stamp-button-blocked" : "block-stamp-button"
const getButtonText = (isBlocked: boolean): string =>
  isBlocked ? "ブロック済" : "ブロック"
const embedBlockStampButton = (viewerCard: HTMLElement) => {
  const emoteH4 = viewerCard.querySelector("h4[data-test-selector='emote-code-header']");
  // if viewer card were not stamp viewer card, ignore it
  const emoteName = emoteH4?.textContent;
  const emoteParent = viewerCard.querySelector("div.emote-card__display-name");
  if (!emoteParent || !emoteName || !emoteH4) {
    return;
  }
  const blockButton = document.createElement("button");
  let isBlocked = blockList.get().includes(emoteName);
  blockButton.innerText = getButtonText(isBlocked);
  const className = getButtonClassName(isBlocked);
  blockButton.classList.add(className);
  blockButton.onclick = () => {
    isBlocked = !isBlocked;
    blockList.add(emoteName);
    hideChatsByEmote(emoteName);
    blockButton.className.replace(className, getButtonClassName(isBlocked));
    blockButton.innerText = getButtonText(isBlocked);
    const closeButton = document.querySelector("button[aria-label='非表示']");
    if (closeButton instanceof HTMLElement) {
      closeButton.click();
    }
  }
  emoteParent.appendChild(blockButton);
}

export const detectViewerCard = async () => {
// repeatedly waits until targetNode are found
  let targetNode: HTMLElement | null = null;
  while (targetNode === null) {
    await sleep(1000)
    targetNode = document.querySelector("div.chat-room__viewer-card[data-a-target='chat-user-card'] > div.viewer-card-layer");
  }

// Options for the observer (which mutations to observe)
  const config = {attributes: true, childList: true, subtree: true} satisfies MutationObserverInit;

// Callback function to execute when mutations are observed
  const observeChats: MutationCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            embedBlockStampButton(node);
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
