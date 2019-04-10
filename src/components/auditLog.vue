<template>
    <section>
        <div class="section-title">
            <div class="rectangle"></div>
            <h2>操作记录</h2>
        </div>
        <div class="table oper-table">
            <div class="table-header">
                <div>操作时间</div>
                <div>类型</div>
                <div>内容</div>
                <div>操作人</div>
            </div>
            <div v-for="(item) in auditLogList" :key="item.auditId">
                <div class="table-content">
                    <div>{{item.auditorTime | formatDate}}</div>
                    <div>{{item.operation}}</div>
                    <div>{{item.memo}}</div>
                    <div>{{item.auditorName}}</div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    // 操作记录组件
    export default {
        name: "auditLog",
        props: {
            auditLogList: { //操作记录列表
                type: Array,
                required: true,
            }
        }
    }
</script>