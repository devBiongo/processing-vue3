import { defineComponent } from 'vue'



const styles = {
    color: '#fff',

}

const Breadcrumb = defineComponent({
    render() {
        return (
            <a-breadcrumb
                v-slots={{
                    separator: () => (
                        <span style={styles}>{'＞'}</span>
                    )
                }}
                style={{whiteSpace: 'nowrap'}}
            >
                <a-breadcrumb-item style={styles}>ワークフロー</a-breadcrumb-item>
                <a-breadcrumb-item style={styles}>タスク管理</a-breadcrumb-item>
                <a-breadcrumb-item style={styles}>ユーザー管理</a-breadcrumb-item>
            </a-breadcrumb>
        )
    }
})

export default Breadcrumb;