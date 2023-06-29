import { defineComponent } from 'vue';
import './style.less'

const Step = ({ label, position }: { label: string, position: any }) => {
    let finalPo = null;
    if (position === 'left') {
        finalPo = { left: '-14px', top: '-16px' };
    } else if (position === 'right') {
        finalPo = { right: '-16px', top: '-16px' };
    } else {
        finalPo = position;
    }
    return (
        <div class="step step-active" style={finalPo}>
            <span class="inner" />
            <span class="label">{label}</span>
        </div>
    )
}

const AppStepper = defineComponent({
    setup() {
        return () => (
            <div class="stepper-container">
                <div class="box">
                    <div class="line">
                        <Step label='オーダー' position="left" />
                        <Step label='見積もり' position="right" />
                    </div>
                </div>
                <div class="box">
                    <div class="line">
                        <Step label='取引先回答' position="right" />
                    </div>
                </div>
                <div class="box">
                    <div class="line">
                        <Step label='会社選択' position="right" />
                    </div>
                </div>
                <div class="box box-border" style={{ flex: 2 }}>
                    <Step label='道路輸送' position={{ top: "-16px", left: "50%", marginLeft: "-15px" }} />
                    <Step label='船輸送' position={{ bottom: "-16px", left: "50%", marginLeft: "-15px" }} />
                    <div class="line">
                        <Step label='関税回答' position={{ left: '50%', top: '-16px', marginLeft: "-15px" }} />
                        <Step label='待ち合わせ' position="right" />
                    </div>

                </div>
                <div class="box">
                    <div class="line" >
                        <Step label='輸送開始日' position="right" />
                    </div>
                </div>
                <div class="box">
                    <div class="line" >
                        <Step label='輸送開始日' position="right" />
                    </div>
                </div>
                <div class="box">
                    <div class="line" >
                        <Step label='装箱' position="right" />
                    </div>
                </div>
                <div class="box">
                <div class="line" >
                        <Step label='完了' position="right" />
                    </div>
                </div>
            </div>
        )
    },
})

export default AppStepper;