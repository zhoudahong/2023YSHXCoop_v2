<template>
    <div class="ranking-list" v-if="list.length">
        <div class="item" v-for="(item, index) in list" :key="'ranking-list' + index">
            <div class="num" :class="{ first: index === 0, second: index === 1, third: index === 2 }">
                {{ index + 1 }}
            </div>
            <div class="container">
                <div class="topText">
                    <div class="name">{{ item.name }}</div>
                    <div v-if="listDataType=='shoushu'" class="percentage">{{ item.num }}台</div>
                    <div v-if="listDataType=='menzhen'|listDataType=='zhuyuan'" class="percentage">{{ item.num }}例</div>
                </div>
                <m-progress :percentage="item.percent"></m-progress>
            </div>
        </div>
    </div>
</template>

<script>
    import {bSort, transformDigital} from '@/lib/utils'
    import mProgress from './m-progress'
    import MCard from "./m-card";

    export default {
        name: 'RankBar',
        props: {
            pageData: {
                type: Object,
                default: () => {
                    return {
                        FIRST_SURGERY: null,
                        SECOND_SURGERY: null,
                        THIRD_SURGERY: null,
                        CLINIC_DIAGNOSIS_TOP: ''
                    }
                }
            },
            listDataType: {//排行榜数据类别，分为门诊menzhen、住院zhuyuan、手术shoushu（默认）
                type: String,
                default: () => {
                    return "shoushu"
                }
            }
        },
        components: {
            MCard,
            mProgress
        },
        data() {
            return {
                list: [{
                    "dept_name": "创伤关节外科",
                    "yyzll_yyghs": "27",
                    "yyzll_zghs": "54",
                    "yyzll_yyghl": "50"
                }, {
                    "dept_name": "儿科",
                    "yyzll_yyghs": "30",
                    "yyzll_zghs": "82",
                    "yyzll_yyghl": "36.59"
                }, {
                    "dept_name": "耳鼻咽喉科",
                    "yyzll_yyghs": "67",
                    "yyzll_zghs": "136",
                    "yyzll_yyghl": "49.26"
                },]
            }
        },
        watch: {
            pageData: {
                // eslint-disable-next-line prettier/prettier
                handler: function () {
                    this.init()
                },
                immediate: true
            }
        },
        methods: {
            judgeIsNotNull(val) {
                return val !== "0" & val !== "0%" & val != null & val !== "null" & val !== ""
            },

            init() {
                this.list = [];
                var first_name = "";
                var first_num = "";
                var second_name = "";
                var second_num = "";
                var third_name = "";
                var third_num = "";


                if (this.listDataType == 'shoushu') {
                    var datas = this.pageData.CLINIC_DIAGNOSIS_TOP;

                    var dataArr = datas.split('|').splice(5)
                    var max = dataArr[0].split(",")[1];
                    console.log("menzhen max", max)

                    if (dataArr.length > 0 & this.judgeIsNotNull(datas)) {
                        for (var i = 0; i < dataArr.length; i++) {
                            this.list.push({
                                name: dataArr[i].split(",")[0],
                                num: dataArr[i].split(",")[1],
                                percent: (parseFloat(dataArr[i].split(",")[1]) / max).toFixed(2) * 100
                            });
                        }
                    } else {
                        this.list = []
                    }
                    /*first_name = this.handleOperationName(this.pageData.FIRST_SURGERY);
                    first_num = parseInt(this.handleOperationNum(this.pageData.FIRST_SURGERY));

                    second_name = this.handleOperationName(this.pageData.SECOND_SURGERY);
                    second_num = parseInt(this.handleOperationNum(this.pageData.SECOND_SURGERY));

                    third_name = this.handleOperationName(this.pageData.THIRD_SURGERY);
                    third_num = parseInt(this.handleOperationNum(this.pageData.THIRD_SURGERY));
                    var max = first_num;
                    if (first_name) {
                        this.list.push({name: first_name, num: first_num, percent: 100});
                    }
                    if (second_name) {
                        this.list.push({
                            name: second_name,
                            num: second_num,
                            percent: second_num / max.toFixed(2) * 100
                        });
                    }
                    if (third_name) {
                        this.list.push({name: third_name, num: third_num, percent: third_num / max.toFixed(2) * 100});
                    }*/
                } else if (this.listDataType == 'menzhen') {
                    var datas = this.pageData.CLINIC_DIAGNOSIS_TOP;

                    var dataArr = datas.split('|').splice(5)
                    var max = dataArr[0].split(",")[1];
                    console.log("menzhen max", max)

                    if (dataArr.length > 0 & this.judgeIsNotNull(datas)) {
                        for (var i = 0; i < dataArr.length; i++) {
                            this.list.push({
                                name: dataArr[i].split(",")[0],
                                num: dataArr[i].split(",")[1],
                                percent: (parseFloat(dataArr[i].split(",")[1]) / max).toFixed(2) * 100
                            });
                        }
                    } else {
                        this.list = []
                    }

                    // var max = first_num;
                    // if (first_name) {
                    //     this.list.push({name: first_name, num: first_num, percent: 100});
                    // }
                    // if (second_name) {
                    //     this.list.push({
                    //         name: second_name,
                    //         num: second_num,
                    //         percent: second_num / max.toFixed(2) * 100
                    //     });
                    // }
                    // if (third_name) {
                    //     this.list.push({name: third_name, num: third_num, percent: third_num / max.toFixed(2) * 100});
                    // }
                } else if (this.listDataType == 'zhuyuan') {
                    var datas = this.pageData.FIRST_DISEASES;

                    var dataArr = datas.split('|').splice(5)
                    var max = dataArr[0].split(",")[1];
                    console.log("menzhen max", max)

                    if (dataArr.length > 0 & this.judgeIsNotNull(datas)) {
                        for (var i = 0; i < dataArr.length; i++) {
                            this.list.push({
                                name: dataArr[i].split(",")[0],
                                num: dataArr[i].split(",")[1],
                                percent: (parseFloat(dataArr[i].split(",")[1]) / max).toFixed(2) * 100
                            });
                        }
                    } else {
                        this.list = []
                    }
                    /*first_name = this.handleOperationName(this.pageData.FIRST_DISEASES);
                    first_num = parseInt(this.handleOperationNum(this.pageData.FIRST_DISEASES));
                    second_name = this.handleOperationName(this.pageData.SECOND_DISEASES);
                    second_num = parseInt(this.handleOperationNum(this.pageData.SECOND_DISEASES));
                    third_name = this.handleOperationName(this.pageData.THIRD_DISEASES);
                    third_num = parseInt(this.handleOperationNum(this.pageData.THIRD_DISEASES));
                    var max = first_num;
                    if (first_name) {
                        this.list.push({name: first_name, num: first_num, percent: 100});
                    }
                    if (second_name) {
                        this.list.push({
                            name: second_name,
                            num: second_num,
                            percent: second_num / max.toFixed(2) * 100
                        });
                    }
                    if (third_name) {
                        this.list.push({name: third_name, num: third_num, percent: third_num / max.toFixed(2) * 100});
                    }*/
                }


                // var max = Math.max(parseInt(first_num), parseInt(second_num), parseInt(third_num))

            },
            handleOperationName(val) {
                var arr = [""];
                if (val) {
                    if (val.toString().split("|").length == 2) {
                        arr = val.split("|")
                    } else {
                        return ""
                    }
                }

                return arr[0]
            },
            handleOperationNum(val) {
                var arr = [""];
                if (val) {
                    if (val.toString().split("|").length == 2) {
                        arr = val.split("|")
                    }
                }
                return arr[1]
            }
        }
    }
</script>

<style lang="scss">
    .ranking-list {
        margin-top: 2px;

        .item {
            display: flex;
            margin-bottom: 9px;
        }

        .num {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            background: #bbc0ce;
            color: #fff;
            border-radius: 50%;
            margin-right: 10px;

            &.first {
                background: #ff7741;
            }

            &.second {
                background: #fbac73;
            }

            &.third {
                background: #fbcd74;
            }
        }

        .container {
            flex: 1;
        }

        .topText {
            display: flex;
            justify-content: space-between;
            height: 18px;
            align-items: center;
            font-size: 14px;
            color: #8b929e;
            padding-bottom: 3px;

            .percentage {
                color: #28c8d1;
            }
        }
    }
</style>
