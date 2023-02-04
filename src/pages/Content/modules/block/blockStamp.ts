import {detectViewerCard} from "./blockStampButton";
import {initBlockChat} from "./blockChat";
import {localStorage} from "../../../../LocalStorage";

export class BlockList {
  private blockList: string[] = []

  constructor() {
    localStorage.get("blockList").then(value => {
      this.blockList = value ?? [];
    })
  }

  private async saveLocalStorage() {
    await localStorage.set("blockList", this.blockList);
  }

  add(blockWord: string) {
    this.blockList.push(blockWord);
    this.saveLocalStorage();
  }

  get() {
    return this.blockList;
  }
}

export const blockList = new BlockList();

export const initBlockStamp = () => {
  Promise.all([
    detectViewerCard(),
    initBlockChat()
  ]);
}
