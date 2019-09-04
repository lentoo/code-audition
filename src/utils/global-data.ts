const globalData = {}

export function set(key: string, val: any) {
  globalData[key] = val
}

export function get(key: string) {
  return globalData[key]
}
