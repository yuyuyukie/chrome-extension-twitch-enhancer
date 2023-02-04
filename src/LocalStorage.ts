class LocalStorage {
  async set(key: string, value: string) {
    await chrome.storage.local.set({[key]: value})
  }

  async get(key: string): Promise<string | undefined> {
    const result = await chrome.storage.local.get(key);
    return result[key];
  }
}

export const localStorage = new LocalStorage();
