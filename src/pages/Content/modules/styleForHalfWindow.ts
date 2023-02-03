
export const styleForHalfWindow = (): void => {
  // changes to theater mode
  const sizeButton = document.querySelector('button[aria-label="シアターモード（Alt + t）"]');
  if (
    sizeButton instanceof HTMLElement
  ) {
    sizeButton.click();
  }
  // style video-player element to 100% width
  const player = document.querySelector("div.persistent-player");
  if (player instanceof HTMLElement) {
    player.classList.add("half-window-player");
  }
  // move chat column to bottom
  const chats = document.querySelector("div.right-column[aria-label='右カラム']");
  if (chats instanceof HTMLElement) {
    chats.classList.add("half-window-chats");
    chats.style.height = `${window.innerHeight - window.innerWidth * 9 / 16}px !important`;
  }
};
