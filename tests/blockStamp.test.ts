import {BlockList} from "../src/pages/Content/modules/blockStamp";

describe('BlockList', () => {
  it('should add stamp to block list', () => {
    const blockList = new BlockList();
    blockList.add("blockWord");
    expect(blockList.get()).toEqual(["blockWord"])
  });
});
