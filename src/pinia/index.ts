import { defineStore } from "pinia"

export const useStore = defineStore('user', {
  state: () => ({
    selectedKey: '/user/home',
    navTags: [
      {
        key: '/wf/home',
        label: 'ホームページ',
        note: '',
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



