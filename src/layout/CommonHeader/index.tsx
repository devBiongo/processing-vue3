import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import Breadcrumb from './components/Breadcrumb'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FullscreenOutlined,
  SettingOutlined,
  SoundOutlined,
} from "@ant-design/icons-vue";
import './style.less'
import NavTags from './components/NavTags';

export default defineComponent({
  name: 'CommonHeader',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["setCollapsed"],
  setup(props, content) {
    const showField = ref(true);
    const checkWindowSize = () => {
      if (window.innerWidth < 768) {
        showField.value = false;
      } else {
        showField.value = true;
      }
    };
    onMounted(() => {
      window.addEventListener('resize', checkWindowSize);
      checkWindowSize();
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkWindowSize);
    });
    return () => (
      <>
        <div class="header-top">
          <div class="header-top-left">
            {
              props.collapsed ?
                <MenuUnfoldOutlined
                  class="trigger"
                  onClick={() => {
                    content.emit("setCollapsed", false);
                  }} />
                :
                <MenuFoldOutlined
                  class="trigger"
                  onClick={() => {
                    content.emit("setCollapsed", true);
                  }}
                />
            }
            {showField.value && (
              <div style={{ paddingLeft: '20px' }}>
                <Breadcrumb />
              </div>
            )}
          </div>
          <div class="header-top-right">
            <SoundOutlined class="header-icon" />
            <SettingOutlined class="header-icon" />
            <FullscreenOutlined class="header-icon" />
          </div>
        </div>
        <div class="header-bottom">
          <NavTags />
        </div>
      </>
    )
  }
})