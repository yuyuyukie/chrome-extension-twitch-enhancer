import {localStorage} from "../src/LocalStorage";
import {chrome} from 'jest-chrome'


describe('LocalStorage.ts', () => {
  it('should store data in storage', async () => {
    chrome.storage.local.get.mockImplementation(async key => {
      if (key === "key") {
        return {key: "value"}
      }
    })
    await localStorage.set("key", "value");
    expect(chrome.storage.local.set).toHaveBeenCalledWith({key: "value"});
    expect(await localStorage.get("key")).toEqual("value");
  });
});
