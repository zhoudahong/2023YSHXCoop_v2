<template>
    <div class="m-card">
        <div class="title" :class="{ 'm-card__title--bg': titlebg }" :style="headStyle">
            <div class="titleleft">
                <div class="icon"><img :src="icon" alt="" srcset=""/></div>
                <div class="text">{{ title }}</div>
            </div>
            <slot name="extra"></slot>
        </div>
        <div class="content" :style="bodyStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'm-card',
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            titlebg: {
                type: Boolean,
                default: false
            },
            headStyle: {
                type: String,
                default: ''
            },
            bodyStyle: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="scss">
    .m-card {
        margin-bottom: 13px;

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            height: 40px;
            font-weight: bold;

            .bg {
                background: linear-gradient(180deg, rgb(245, 245, 245) 0%, #fff 100%);
            }
        }

        .titleleft {
            display: flex;
            .icon {
                width: 22px;
                height: 22px;
                margin-right: 6px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .text {
                font-size: 16px;
                color: #333333;
            }
        }



        .content {
            padding: 0 15px;
        }
    }
</style>
