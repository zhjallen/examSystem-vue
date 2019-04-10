<template>
    <section>
        <div class="section-title">
            <div class="rectangle"></div>
            <h2>审核意见</h2>
        </div>
        <div>
            <textarea v-model="reviewMemo" placeholder="审核备注：输入300字以内评审意见"></textarea>
        </div>
        <div class="btn">
            <button class="btn-cancle" :disabled="buttonDisabled" @click="reviewHandle(1)"><span>驳回</span></button>
            <button class="btn-primary" :disabled="buttonDisabled" @click="reviewHandle(0)"><span>通过</span></button>
        </div>
    </section>
</template>
<script>
    // 审核操作组件
    export default {
        name: "review",
        data: function () {
            return {
                reviewMemo: "",
            }
        },
        props: {
            buttonDisabled: {
                type: Boolean,
                required: true,
            }
        },
        methods: {
            reviewHandle(isPass) {
                let reviewParams = {
                    auditStatus: isPass,
                };
                if (isPass === 1) { // 审核不通过
                    if (this.reviewMemo && this.reviewMemo.trim()) {
                        reviewParams.memo = this.reviewMemo.trim()
                    } else {
                        // this.$message.error("请输入备注信息");
                        dd.device.notification.alert({
                            message: "请输入审核意见",
                            title: "提示", //可传空
                            buttonName: "知道了",
                            onSuccess: function () {
                                //onSuccess将在点击button之后回调
                                /*回调*/
                            },
                            onFail: function (err) {}
                        });
                        return;
                    }
                }
                if (isPass === 0) {
                    reviewParams.memo = this.reviewMemo && this.reviewMemo.trim();
                }
                this.$emit("review", reviewParams)
            }
        }
    }
</script>