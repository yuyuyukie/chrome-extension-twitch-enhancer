export class BlockList {
  private blockList: string[] = []

  add(blockWord: string) {
    this.blockList.push(blockWord);
  }
}

const blockList = new BlockList();

const embedBlockStampButton = (viewerCard: HTMLElement) => {
  const emoteH4 = viewerCard.querySelector("h4[data-test-selector='emote-code-header']");
  // if viewer card were not stamp viewer card, ignore it
  const emoteName = emoteH4?.textContent;
  const emoteParent = viewerCard.querySelector("div.emote-card__display-name");
  if (!emoteParent || !emoteName || !emoteH4) {
    return;
  }
  const blockButton = document.createElement("button");
  blockButton.innerText = "ブロック";
  blockButton.classList.add("block-stamp-button");
  blockButton.onclick = () => {
    blockList.add(emoteName);
  }
  emoteParent.appendChild(blockButton);
}

const detectViewerCard = () => {
  let interval: number | undefined = undefined
  interval = window.setInterval(() => {
    const viewerCard = document.querySelector("div[data-a-target='viewer-card-positioner']");
    if (viewerCard instanceof HTMLElement) {
      clearInterval(interval)
      embedBlockStampButton(viewerCard)
    }
  }, 100)
}

// Select the node that will be observed for mutations
const targetNode = document.querySelector("div.right-column[aria-label='右カラム']");

// Options for the observer (which mutations to observe)
const config = {attributes: true, childList: true, subtree: true} satisfies MutationObserverInit;

// Callback function to execute when mutations are observed
const callback: MutationCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
if (targetNode) {
  observer.observe(targetNode, config);
}

export const initBlockStamp = () => {
  document.addEventListener("click", ev => {
    if (ev.target instanceof HTMLImageElement &&
      ev.target.classList.contains("chat-image")
    ) {
      detectViewerCard()
    }
  })
}
