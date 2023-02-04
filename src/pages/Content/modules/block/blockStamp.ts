import {detectViewerCard} from "./blockStampButton";
import {initBlockChat} from "./blockChat";

export class BlockList {
  private blockList: string[] = []

  add(blockWord: string) {
    this.blockList.push(blockWord);
  }

  get() {
    return this.blockList;
  }
}

export const blockList = new BlockList();

export const initBlockStamp = () => {
  detectViewerCard();
  initBlockChat();
}


// TODO observe chats and delete them depends on block list

// TODO create block list in Popup
// TODO unblock stamp if stamp were already blocked
// TODO validate whether words to block are already blocked
