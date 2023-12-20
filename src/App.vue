<template>
    <div class="App vci-bg-fill" :class="urlUserInfo.type">
        <doctor
                :inList="inList"
                :pageData="pageData"
                :user_info="user_info"
                :drg_month="drg_month"
                :list="list"
                :urlUserInfo="urlUserInfo"
                :noOnlineDataJudge="noOnlineDataJudge"
                v-if="urlUserInfo.type === 'doctor'"
        ></doctor>
        <nurse
                :inList="inList"
                :pageData="pageData"
                :user_info="user_info"
                :drg_month="drg_month"
                :list="list"
                :urlUserInfo="urlUserInfo"
                v-if="urlUserInfo.type === 'nurse'"
        ></nurse>
        <technician
                :inList="inList"
                :pageData="pageData"
                :user_info="user_info"
                :drg_month="drg_month"
                :list="list"
                :urlUserInfo="urlUserInfo"
                v-if="urlUserInfo.type === 'technician'"
        ></technician>
        <img class="chibang" src="@/common/assets/img/nurse_chibang.png" alt=""/>
        <img class="qicai" src="@/common/assets/img/qicai.png" alt=""/>
        <div class="music-play">
            <img :src="music_img" alt=""/>
            <audio
                    hidden
                    ref="audio"
                    id="bg-audio"
                    :src="audio"
                    autoplay
                    loop
                    preload="auto"
            ></audio>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import wx from "weixin-js-sdk";
    import navList from "@/config/navList.js";
    import doctor from "./views/doctor.vue";
    import nurse from "./views/nurse.vue";
    import technician from "./views/technician.vue";

    export default {
        components: {
            doctor,
            nurse,
            technician,
        },
        data() {
            return {
                menuList: [],//菜单栏显示的数组

                audio: "./static/media/down.mp3",
                music: "icon-musicfill",
                isOff: false,
                playFlag: true,
                clickMusicBtn: false,
                music_img: "",
                // music_img: require("./common/assets/img/music.png"),

                pageData: {}, //接口总数据
                user_info: {}, //身份数据
                drg_month: {},

                urlUserInfo: {
                    user_name: "",
                    dept_name: "",
                    gender: "",
                    type: "",
                },

                noOnlineDataJudge: false,//默认网络门诊有数据，菜单栏要显示
                noHexinzhiduDataJudge: false,//默认制度有数据，菜单栏要显示

                swiperOptOut: {
                    direction: "vertical",
                    slidesPerView: "auto",
                },
                swiperOpt: {
                    direction: "vertical",
                    slidesPerView: "auto",
                    spaceBetween: 0,
                    freeMode: true,
                    on: {
                        slideChange: () => {
                            if (this.$refs["list-swiper-in"].swiper) {
                                let nav = this.inList[this.$refs["list-swiper-in"].swiper.activeIndex].name;
                                this.$store.commit("changeNav", nav);
                            }
                        },
                    },
                    // initialSlide: 0
                },
                list: new Array(3).fill({}),
                inList: new Array(10).fill({}),
            };
        },
        created() {
        },
        mounted() {
            //获取地址栏的参数：部门、姓名、性别
            this.getUrl_DeptUserGender();
            //请求获取数据接口
            this.getDatas();
            //音频播放
            this.autoPlayAudio();
            //  请求nav数据
            // this.dataHandle();
            // this.wxAutoHandle();
        },
        methods: {
            dataHandle() {
                var type = this.urlUserInfo.type

                console.log("type", type)

                this.inList = this.menuList
                console.log("this.inList", this.inList)
                /*this.inList = navList[type].map((item, index) => ({
                    index,
                    name: item,
                }));*/
                /*if (!this.noOnlineDataJudge) {
                    this.inList = navList[type].map((item, index) => ({
                        index,
                        name: item,
                    }));
                } else {
                    /!*this.inList = navList[type].map((item, index) => ({
                        index,
                        name: item,
                    }));*!/
                    this.inList = [
                        {index: 0, name: "门诊"},
                        {index: 1, name: "住院"},
                        {index: 2, name: "手术"},
                        {index: 3, name: "为军服务"},
                        {index: 4, name: "DRG与质控"},
                        {index: 5, name: "特别的日子"},
                    ];
                }*/

                this.$store.commit("changeNav", this.inList[0].name);
            },

            autoPlayAudio() {
                //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
                document.addEventListener("touchstart", function () {
                    function audioAutoPlay() {
                        var audio = document.getElementById("bg-audio");
                        // console.log("DOMContentLoaded audio", audio)
                        audio.play();
                    }

                    audioAutoPlay();
                });

                //--进行音频播放
                document.addEventListener("WeixinJSBridgeReady", function () {
                    function audioAutoPlay() {
                        var audio = document.getElementById("bg-audio");
                        console.log("DOMContentLoaded audio", audio);
                        audio.play();
                    }

                    audioAutoPlay();
                });
            },

            audioClick() {
                if (this.music === "icon-musicforbidfill") {
                    this.music = "icon-musicfill";
                    this.$refs.audio.pause();
                } else {
                    this.music = "icon-musicforbidfill";
                    this.$refs.audio.play();
                }
            },

            getUrl_DeptUserGender() {
                var user_name = this.utf8to16(unescape(this.getQueryString("user_name")));
                var dept_name = this.utf8to16(unescape(this.getQueryString("dept_name")));
                var gender = this.utf8to16(unescape(this.getQueryString("gender")));
                var type = this.utf8to16(
                    unescape(this.getQueryString("type") || "医生")
                );
                if (type == '医生') {
                    this.urlUserInfo.type = 'doctor'
                    this.urlUserInfo.postType = '医生'
                } else if (type == '护士') {
                    this.urlUserInfo.type = 'nurse'
                    this.urlUserInfo.postType = '护士'
                } else if (type == '医技') {
                    this.urlUserInfo.type = 'technician'
                    this.urlUserInfo.postType = '医技'
                }

                // var year = this.utf8to16(unescape(this.getQueryString("year")));
                var year = this.getQueryString("year");
                this.urlUserInfo.user_name = user_name;
                this.urlUserInfo.dept_name = dept_name;
                this.urlUserInfo.gender = gender;
                // this.urlUserInfo.type = user_type;
                this.urlUserInfo.year = year;
            },

            async getDatas() {
                // var random = Math.ceil(Math.random() * this.zhici.length - 1);
                // console.log("random", random)
                // this.zhici_text = this.zhici[random]

                const params = new URLSearchParams();
                params.append("user_name", this.urlUserInfo.user_name);
                params.append("dept_name", this.urlUserInfo.dept_name);
                params.append("user_type", this.urlUserInfo.postType);
                params.append("year", this.urlUserInfo.year);
                // params.append('user_name', this.getQueryString('user_name'))
                // params.append('dept_name', this.getQueryString('dept_name'))
                // await axios.post('http://192.168.48.78:9005/api/profile', params).then(res => {
                // await axios.post('http://61.186.173.203:54442/api/profile', params).then(res => {

                await axios
                    .post("http://183.230.51.25:54442/api/profile", params)
                    .then((res) => {
                        this.pageData = res.data.res;
                        this.drg_month = res.data.drg_month;
                        this.user_info = res.data.user_info[0];

                        //如果网络门诊都没有数据，则菜单栏不显示
                        console.log("this.judgeIsNotNull(this.pageData.ONLINE_CONSULTATION", this.pageData.ONLINE_CONSULTATION)
                        console.log("this.judgeIsNotNull(this.pageData.ONLINE_CONSULTATION", this.judgeIsNotNull(this.pageData.ONLINE_CONSULTATION))
                        if (this.judgeIsNotNull(this.pageData.ONLINE_CONSULTATION) & this.judgeIsNotNull(this.pageData.ONLINE_PRESCRIPTION) & this.judgeIsNotNull(this.pageData.ONLINE_EXAMINATION) & this.judgeIsNotNull(this.pageData.ONLINE_CASE_HISTORY)) {
                            this.noOnlineDataJudge = true
                        }
                        //如果核心制度都没有数据，则不显示“核心制度落实”标题
                        if (this.judgeIsNotNull(this.pageData.MZCYZDFHL) & this.judgeIsNotNull(this.pageData.SRQZL) & this.judgeIsNotNull(this.pageData.RYCYDYZDFHL) & this.judgeIsNotNull(this.pageData.SQZDSHZDFHL) & this.judgeIsNotNull(this.pageData.YNWZL) & this.judgeIsNotNull(this.pageData.ZYHZL)) {
                            this.noHexinzhiduDataJudge = true
                        }


                        /*var noDataMenu = ''
                        if (this.judgeIsNull(this.pageData.VISITS_NUM)) {
                            console.log("进入了judgeIsNull(VISITS_NUM)")
                            noDataMenu = '门诊'
                        } else if (this.judgeIsNull(this.pageData.INPATIENTS_NUM)) {
                            console.log("进入了judgeIsNull(INPATIENTS_NUM)")
                            noDataMenu = '住院'
                        } else if (this.judgeIsNull(this.pageData.TOTAL_SURGERY_VOLUME)) {
                            console.log("进入了judgeIsNull(TOTAL_SURGERY_VOLUME)")
                            noDataMenu = '手术'
                        } else if (this.judgeIsNull(this.pageData.MILITARY_VISITS_NUM)) {
                            console.log("进入了judgeIsNull(MILITARY_VISITS_NUM)")
                            noDataMenu = '为军服务'
                        } else if (this.judgeIsNull(this.pageData.BIRTHDAY_VISITS_NUM)) {
                            console.log("进入了judgeIsNull(BIRTHDAY_VISITS_NUM)")
                            noDataMenu = '特别的日子'
                        } else if (this.judgeIsNull(this.pageData.ONLINE_CONSULTATION)) {
                            console.log("进入了judgeIsNull(ONLINE_CONSULTATION)")
                            noDataMenu = '网络门诊'
                        }
                        // noDataMenu = '门诊';
                        var type = this.urlUserInfo.type;
                        this.menuList = navList[type].filter(item => item != noDataMenu);
                        console.log("this.menuList", this.menuList)
                        console.log("judgeIsNull(this.pageData.MILITARY_VISITS_NUM", this.judgeIsNull(this.pageData.MILITARY_VISITS_NUM))

                        this.inList = this.menuList.map((item, index) => ({
                            index,
                            name: item,
                        }));

                        console.log("this.inList", this.inList)

                        this.$store.commit("changeNav", this.inList[0].name);*/

                        var type = this.urlUserInfo.type
                        this.inList = navList[type].map((item, index) => ({
                            index,
                            name: item,
                        }))
                    })
                    .catch();
            },

            judgeIsNotNull(val) {
                //判断val有值，有值返回1，无值返回0
                return val !== "0" & val !== "0%" & val != null & val !== "null" & val !== ""
            },
            judgeIsNull(val) {
                //判断val是空的，有值返回0表示false，无值返回1表示true
                return val == "0" | val == "0%" | val == null | val == "null" | val == ""
            },

            getQueryString(param) {
                //param为要获取的参数名 注:获取不到是为null
                const currentUrl = window.location.href; //获取当前链接
                let arr = currentUrl.split("?"); //分割域名和参数界限
                if (arr.length > 1) {
                    arr = arr[1].split("&"); //分割参数
                    for (let i = 0; i < arr.length; i++) {
                        const tem = arr[i].split("="); //分割参数名和参数内容
                        if (tem[0] == param) {
                            return tem[1];
                        }
                    }
                    return null;
                } else {
                    return null;
                }
            },

            //对地址栏的参数进行中文转义
            utf8to16(str) {
                var out, i, len, c;
                var char2, char3;
                out = "";
                len = str.length;
                i = 0;
                while (i < len) {
                    c = str.charCodeAt(i++);
                    switch (c >> 4) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            out += str.charAt(i - 1);
                            break;
                        case 12:
                        case 13:
                            char2 = str.charCodeAt(i++);
                            out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
                            break;
                        case 14:
                            char2 = str.charCodeAt(i++);
                            char3 = str.charCodeAt(i++);
                            out += String.fromCharCode(
                                ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
                            );
                            break;
                    }
                }
                return out;
            },
        },
    };
</script>
<style lang="scss">
    // 背景填充方式 fill
    .vci-bg-fill {
        background-repeat: no-repeat;
        background-size: cover;
    }

    html,
    body {
        height: 100%;
    }

    .App {
        overflow: hidden;
        height: 100%;

        &.doctor {
            background-image: url("./common/assets/img/bg.png");
        }

        &.nurse {
            background-image: url("./common/assets/img/nurse_bg.png");

            .ListSwiper {
                z-index: 2;
            }

            .chibang {
                display: block;
            }
        }

        &.technician {
            background-image: url("./common/assets/img/technician_bg.png");

            .ListSwiper {
                z-index: 2;
            }

            .qicai {
                display: block;
            }
        }

        .music-play {
            position: absolute;
            top: 10px;
            right: 10px;
            /*width: 40px;*/
            /*height: 40px;*/
            z-index: 10;
            /*background-image: url("./common/assets/img/music.png");*/
        }

        .swiper-slide {
            text-align: center;
            color: #3f3f3f;
            font-family: "ss-r", sans-serif;

            .swiper-in {
                min-height: 100%;
                height: auto;
            }
        }

        .swiper-center {
            height: 100%;
        }

        .chibang {
            display: none;
            position: absolute;
            width: 375px;
            height: 184px;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
        }

        .qicai {
            display: none;
            position: absolute;
            width: 227px;
            height: 171px;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
        }
    }
</style>
