<template>
    <div class="TheEnd">
        <div class="logo vci-bg-fill"/>

        <div class="txt font-ss-m">
            <div v-for="(item, index) in list1" class="the-column">
                {{ item }}
            </div>
            <div class="the-column" style="visibility: hidden">.</div>
            <div v-for="(item, index) in list2" class="the-column">
                {{ item }}
            </div>
        </div>

        <BaseText class="end-base-text"/>
        <!--<BaseText text="祝全院医护人员新年快乐，\n" class="end-base-text"/>-->
        <!--<BaseText text="向白衣天使致敬！" class="end-base-text" style="margin-top: 10px"/>-->

        <div class="txt font-ss-m">
            <div v-for="(item, index) in list3" class="the-copyright">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
    import BaseText from "../../common/components/BaseText/BaseText.vue";

    export default {
        name: "TheEnd",
        components: {BaseText},
        data() {
            return {
                changeLineShow: false,
                list1:
                    `
                    走过的2023，
                    感谢有您！
                    与疾病较量，与死神赛跑。
                    感谢有您！
                    以凡人之躯，托举生命。`
                        .split("\n")
                        .map((item) => item),

                list2:
                    `
                    瑞兔辞旧去，祥龙迎新来。
                    2024已晨曦破晓，
                    新的一年，
                    微光成炬，汇聚星河。
                    新的一年，
                    温暖常伴，幸福相随。
                    新的一年，
                    重整行装，逐梦前行！`
                        .split("\n")
                        .map((item) => item),

                /*list1: `
                      走过的2023，
                      感谢有您！
                      与死神赛跑，与疾病较量！
                      感谢有您！
                      以凡人之躯，托举生命！
          `
                        .split("\n")
                        .map((item) => item),

                list2: `
                      虎越雄关，兔临春境。
                      鼎故辞旧，万象更新。
                      2024已晨曦破晓，
                      新的一年，
                      微光成炬，汇聚星河。
                      新的一年，
                      温暖相伴，幸福前行。
                      新的一年，
                      我们一起，让爱接力！
                      新的一年，
                      我们一起，点燃希望！
          `
                        .split("\n")
                        .map((item) => item),*/

                list3: `
            设计开发：医学大数据与人工智能中心 ©2023
`
                    .split("\n")
                    .map((item) => item),
            };
        },
    };
</script>

<style scoped lang="scss">
    .TheEnd {
        position: relative;
        height: 100%;

        .logo {
            position: absolute;
            top: 0;
            left: 0;
            width: 261px;
            height: 356px;
            background-image: url("./img/bg.png");
        }

        .txt {
            position: relative;
            z-index: 10;
            padding-top: 50px;
            color: #187b3c;
            font-size: 18px;

            .the-column {
                & + .the-column {
                    margin-top: 5px;
                }
            }
        }

        :deep(.BaseText) {
            margin-top: 50px;
            color: deeppink;
            font-weight: bold;
            font-size: 30px;
        }

        .the-copyright {
            margin-top: -20px;
            color: black;
            font-weight: normal;
            font-size: 12px;
        }

        .end-base-text {
            white-space: pre-wrap
        }
    }

    .nurse .TheEnd {
        .txt {
            color: #de3030;
        }

        .BaseText :deep(.logo) {
            filter: sepia(2);
        }

        .BaseText {
            color: #ff6969;
        }
    }

    .technician .TheEnd {
        .logo {
            filter: invert(1) contrast(500%) opacity(0.2);
        }

        .txt {
            color: #4891ff;
        }

        .BaseText :deep(.logo) {
            filter: hue-rotate(45deg);
        }

        .BaseText {
            color: #4891ff;
        }
    }
</style>
