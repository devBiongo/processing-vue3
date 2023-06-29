import { CloseOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue'
import './style.less'
import { useStore } from '@/pinia'
import { storeToRefs } from 'pinia';




const NavTags = defineComponent({
    setup() {
        const store = storeToRefs(useStore());
        const { navTags, selectedKey } = store;
        return () => (
            <>
                {navTags.value.map(navTag => (
                    <span
                        class={selectedKey.value === navTag.key ? "nav-tag nav-tag-active" : "nav-tag"}
                        onClick={()=>{
                            store.selectedKey.value = navTag.key;
                        }}
                    >
                        {navTag.label}<CloseOutlined class="icon" onClick={()=>{
                            store.navTags.value = navTags.value.filter(s=>s.key!==navTag.key);      
                        }}/>
                    </span>
                ))}
            </>
        )
    },
})

export default NavTags;