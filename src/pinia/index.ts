import { defineStore } from "pinia"

export const useStore = defineStore('user', {
  state: () => ({
    selectedKey: '/user/home',
    navTags: [
      {
        key: '/user/home',
        label: 'ホームページ'
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



