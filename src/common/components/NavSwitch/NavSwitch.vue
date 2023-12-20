<template>
    <div class="NavSwitch font-ss-r">
        <div
                v-for="(item, index) in list"
                :key="index"
                :class="[item.name, { active: item.name === pointer }]"
                @click="navClick(item)"
                class="the_nav"
        >
            <div class="img-bg vci-bg-fill"></div>
            <span class="text">{{ item.name }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavSwitch",
        props: {
            pointer: {
                type: String,
                default: "",
            },
            list: {
                type: Array,
                default: null,
            },
        },
        methods: {
            navClick(item) {
                this.$store.commit("changeNav", item.name);
            },
        },
    };
</script>

<style scoped lang="scss">
    .NavSwitch {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 12px 10px 0;
        box-sizing: border-box;

        .the_nav {
            font-size: 12px;
            font-style: italic;
            text-align: center;

            .img-bg {
                display: none;
                animation: fadeIn 0.3s forwards;
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            }

            .text {
            }

            $arr: ("门诊", 33px, 18px, 60px), ("住院", 33px, 18px, 60px),
                    ("手术", 33px, 18px, 60px), ("为军服务", 62px, 18px, 110px),
                    ("DRG与质控", 78px, 18px, 70px), ("网络门诊", 61px, 18px, 60px),
                    ("特别的日子", 74px, 18px, 126px);
            @for $i from 1 through length($arr) {
                &.#{ nth(nth($arr,$i),1) } {
                    &.active {
                        // width: nth(nth($arr, $i), 4) !important;
                    }

                    .img-bg {
                        width: nth(nth($arr, $i), 2);
                        height: nth(nth($arr, $i), 3);
                        background-image: url("./img/#{nth(nth($arr,$i),1)}.png");
                    }
                }
            }

            &.active {
                width: auto !important;

                .img-bg {
                    display: block;
                }

                .text {
                    display: none;
                }
            }
        }
    }
</style>
