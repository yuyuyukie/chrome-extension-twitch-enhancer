import {localStorage} from "../src/LocalStorage";
import {chrome} from 'jest-chrome'


describe('LocalStorage.ts', () => {
  it('should store data in storage', async () => {
    await localStorage.set("blockList", ["value"]);
    expect(chrome.storage.local.set).toHaveBeenCalledWith({blockList: ["value"]});
  });
});
