<template>
    <div class="PatientsAccount">
        <i class="bg-img vci-bg-fill"/>
        <div class="in-box">
            <div
                    v-for="(item,index) in list"
                    :key="index"
                    class="the-column"
            >
                <div class="value-unit">
                    <span class="value font-din-bold">{{item.value}}</span><span class="unit">{{item.unit}}</span>
                </div>
                <div class="name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PatientsAccount",
        props: {
            list: {
                type: Array,
                default: null
            }
        }
    }
</script>

<style scoped lang="scss">
    .PatientsAccount {
        position: relative;
        height: 88px;
        color: #3f3f3f;

        .bg-img {
            position: absolute;
            left: 50.4%;
            top: 0;
            width: 298px;
            height: 90px;
            background-image: url("./img/percent.png");
            transform: translate(-50%, 0);
        }

        .in-box {
            position: absolute;
            left: 50%;
            top: 50%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            /*width: 90%;*/
            width: 77%;
            height: 64px;
            transform: translate(-50%, -50%);

            .the-column {
                .value-unit {
                    .value {
                        margin-right: 2px;
                        font-size: 18px;
                        color: #1d953f;
                    }

                    .unit {
                    }
                }

                .name {
                    font-size: 15px;
                    white-space: pre-wrap;
                    /*文字需要换行，则在文字中加入'\n'，然后添加’white-space: pre-wrap’即可;*/
                    /*font-weight: bold;*/
                }

                &:nth-child(1) {
                    text-align: right;
                }

                &:nth-child(2) {
                    .value-unit {
                        .value {
                            font-size: 16px;
                        }

                        .unit {
                            color: #1d953f;
                        }
                    }

                    text-align: center;
                }

                &:nth-child(3) {
                }
            }
        }
    }
</style>
