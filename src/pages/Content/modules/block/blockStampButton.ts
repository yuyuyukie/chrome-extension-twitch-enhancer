import {blockList} from "./blockStamp";

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

export const detectViewerCard = () => {
  let interval: number | undefined = undefined
  interval = window.setInterval(() => {
    const viewerCard = document.querySelector("div[data-a-target='viewer-card-positioner']");
    if (viewerCard instanceof HTMLElement) {
      clearInterval(interval)
      embedBlockStampButton(viewerCard)
    }
  }, 100)
}
