export const styleForHalfWindow = (): void => {
  // changes to theater mode
  const sizeButton = document.querySelector('button[aria-label="シアターモード（Alt + t）"]');
  if (
    sizeButton instanceof HTMLElement
  ) {
    sizeButton.click();
  }
  // unmute
  const mutedButton = document.querySelector("button[aria-label='ミュート解除（m）']");
  if(mutedButton instanceof HTMLElement){
    mutedButton.click();
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
  }
};

const revertHalfWindow = () => {
  // revert theater mode
  const sizeButton = document.querySelector('button[aria-label="シアターモードを終了（Alt+t）"]');
  if (
    sizeButton instanceof HTMLElement
  ) {
    sizeButton.click();
  }
  // style video-player element to 100% width
  const player = document.querySelector("div.persistent-player");
  if (player instanceof HTMLElement) {
    player.classList.remove("half-window-player");
  }
  // move chat column to bottom
  const chats = document.querySelector("div.right-column[aria-label='右カラム']");
  if (chats instanceof HTMLElement) {
    chats.classList.remove("half-window-chats");
  }
}

let activatedHalfWindow = false;
export const toggleHalfWindowView = () => {
  if (activatedHalfWindow) {
    revertHalfWindow();
  } else {
    styleForHalfWindow();
  }
  activatedHalfWindow = !activatedHalfWindow;
}
