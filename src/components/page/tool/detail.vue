<template>
    <div class="table">
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="badge" label="第一完成人工号"  align="center">
                </el-table-column>
                <el-table-column prop="name" label="第一完成人"  align="center">
                </el-table-column>
            </el-table>
    </div>
</template>

<script>
    export default {
        name: 'detail',
        props:['details'],
        data: function(){
            return {
                tableData:[],
            }
        },
        mounted:function(){
            this.tableData=this.details
            console.log(this.details)
        },
        methods: {}
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
