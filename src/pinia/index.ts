import { defineStore } from "pinia"

export const useStore = defineStore('user', {
  state: () => ({
    selectedKey: '1',
    navTags: [
      {
        key: '1',
        label: '既存一覧1'
      },
      {
        key: '2',
        label: '既存一覧2'
      },
      {
        key: '3',
        label: '既存一覧3'
      },
    ],
  }),
  getters: {},
  actions: {
    updateSelectedKey(newKey: string) {
      this.selectedKey = newKey;
    },
  },
})



