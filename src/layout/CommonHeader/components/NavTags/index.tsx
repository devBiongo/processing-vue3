import { CloseOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import "./style.less";
import { useStore } from "@/pinia";
import { useRouter } from "vue-router";

const NavTags = defineComponent({
  setup() {
    // storeToRefs(useStore());
    const router = useRouter();
    const store = useStore();
    return () => (
      <div>
        {store.navTags.map((navTag) => (
          <span
            class={
              store.selectedKey === navTag.key
                ? "nav-tag nav-tag-active"
                : "nav-tag"
            }
            onClick={() => {
              store.selectedKey = navTag.key;
              router.push(navTag.key);
            }}
          >
            {navTag.label}
            {navTag.key!=='/user/home' && (
              <CloseOutlined
                class="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  const index = store.navTags.findIndex(
                    (s) => s.key === navTag.key
                  );
                  if (index !== -1) {
                    store.navTags.splice(index, 1);
                  }
                  if (store.selectedKey === navTag.key) {
                    const t = store.navTags[store.navTags.length - 1].key;
                    store.selectedKey = t;
                    router.push(t);
                  }
                }}
              />
            )}
          </span>
        ))}
      </div>
    );
  },
});

export default NavTags;
