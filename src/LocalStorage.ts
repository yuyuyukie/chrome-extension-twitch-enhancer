type LocalStorageType = {
  blockList: string[]
}

class LocalStorage {
  async set<T extends keyof LocalStorageType>(key: T, value: LocalStorageType[T]) {
    await chrome.storage.local.set({[key]: value})
  }

  async get<T extends keyof LocalStorageType>(key: T): Promise<LocalStorageType[T]> {
    const result = await chrome.storage.local.get(key);
    return result[key];
  }
}

export const localStorage = new LocalStorage();
