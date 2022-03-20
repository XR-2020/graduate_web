<template>
    <div class="table">
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="people.badge" label="第一完成人工号"  align="center">
                </el-table-column>
                <el-table-column prop="people.name" label="第一完成人"  align="center">
                </el-table-column>
            </el-table>
    </div>
</template>

<script>
    export default {
        name: 'detail',
        props:['detail'],
        mounted:function(){
            this.tableData=this.detail
        },
        data() {
            return {
                tableData: [{
                    people:{
                        name:'',
                        badge:'',
                    },
                }],
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
        }
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
