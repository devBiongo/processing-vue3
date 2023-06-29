import { defineComponent, ref } from 'vue'
import {
    HomeOutlined,
    FileDoneOutlined,
    UserOutlined,
    SettingOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from 'vue-router';


const CommonSideMenu = defineComponent({
    setup() {
        const selectedKeys = ref<string[]>(["2"]);
        const menus = [
            {
                key: '/user/home',
                icon: <HomeOutlined style={{ fontSize: '18px' }} />,
                label: 'ホームページ',
            },
            {
                key: '/user/newTask',
                icon: <FileDoneOutlined style={{ fontSize: '18px' }} />,
                label: '新規タスク',
            },
            {
                key: '/user/taskList',
                icon: <FileDoneOutlined style={{ fontSize: '18px' }} />,
                label: '既存タスク',
            },
            {
                key: '/user/task',
                icon: <FileDoneOutlined style={{ fontSize: '18px' }} />,
                label: 'タスク管理',
            },
            {
                key: '/user/manage',
                icon: <UserOutlined style={{ fontSize: '18px' }} />,
                label: 'ユーザー管理',
            },
            {
                key: 'sub2',
                icon: <SettingOutlined style={{ fontSize: '18px' }} />,
                label: 'システム管理',
                children: [
                    {
                        key: '/log',
                        label: 'ログ一覧',
                    },
                ]
            }
        ]
        const router = useRouter();
        const handleNavigation = (target: string) => {
            router.push(target);
        };
        return () => (
            <a-menu selectedKeys={selectedKeys.value} theme="light" mode="inline">
                {
                    menus.map(menu => (
                        <>
                            {menu.children ? (
                                <a-sub-menu
                                    style={{ userSelect: 'none' }}
                                    key={menu.key}
                                    v-slots={{
                                        title: () => (
                                            <span>
                                                {menu.icon}
                                                <span>{menu.label}</span>
                                            </span>
                                        )
                                    }}
                                >
                                    {menu.children.map(cMenu => (
                                        <a-menu-item
                                            style={{ userSelect: 'none' }}
                                            key={cMenu.key}
                                            onClick={() => {
                                                selectedKeys.value = [cMenu.key];
                                                handleNavigation(cMenu.key);
                                            }}
                                        >
                                            {cMenu.label}
                                        </a-menu-item>
                                    ))}
                                </a-sub-menu>
                            ) : (
                                <a-menu-item
                                    style={{ userSelect: 'none' }}
                                    key={menu.key}
                                    onClick={() => {
                                        selectedKeys.value = [menu.key];
                                        handleNavigation(menu.key);
                                    }}
                                >
                                    {menu.icon}
                                    <span>{menu.label}</span>
                                </a-menu-item>
                            )
                            }
                        </>
                    ))
                }
            </a-menu>
        )
    },
})

export default CommonSideMenu;