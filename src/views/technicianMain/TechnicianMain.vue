<template>
  <div class="NurseMain vci-bg-fill">
    <i class="logo vci-bg-fill" />
    <div class="text-img vci-bg-fill font-xg">
      <!--<img class="hospital" :src="hospital" alt="" />-->
      <div class="year-forge">回眸<span class="year font-ss">2023</span></div>
      <div class="year-b-text">感谢有您！</div>
    </div>

    <div class="person-info">
      <div class="name font-pm-zd">{{ urlUserInfo.user_name }}</div>
      <div class="department font-pm-zd">{{ urlUserInfo.dept_name }}</div>
      <div class="level font-ss-m">{{ level }}</div>
    </div>
    <img class="is-sex" :class="gender" :src="imgSrc" alt="" />

    <div class="typer">
      <div class="typer-content">
        <div class="info-slogan typer-dynamic">
          <div v-for="(item, index) in info" :key="index" class="the-column">
            <!-- 模拟光标-->
            <!--<span class="typer-cursor"></span>-->
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TechnicianMain",
  props: {
    pageData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    user_info: {
      type: Object,
      default: () => {
        return {};
      },
    },
    urlUserInfo: {
      type: Object,
      default: () => {
        return {
          user_name: "",
          dept_name: "",
          gender: "",
        };
      },
    },
  },

  data() {
    return {
      imgSrc: require("./img/bg.man.png"),
      // hospital: require("./img/hospital.png"),
      //   imgSrc: "",
      name: "",
      department: "",
      level: "",
      gender: "",
      info: [],

      //动画效果所需
      words: [], //字母数组push，pop的载体
      str:
        "走过的2023，XX" +
        "注定不同凡响。XX" +
        "回眸这一年，XX" +
        "有欢笑、有泪水，XX" +
        "有收获、有遗憾。XX" +
        "这一年，每分每秒，XX" +
        "回荡着奋斗的激情。XX" +
        "这一年，每时每刻，XX" +
        "燃烧着坚持的笃定，XX" +
        "这一年，每月每日，XX" +
        "留存着离去的温馨。XX" +
        "在这辞旧迎新的日子，XX" +
        "让我们一起，XX" +
        "回望过去，XX" +
        "展望明朝！", //str初始化
      letters: [], //str分解后的字母数组
      order: 1, //表示当前是第几句话
    };
  },

  mounted() {
    this.dataHandle();
    this.genderHandle();
    // this.begin();
  },
  watch: {
    pageData: {
      handler: "dataHandle",
      immediate: true,
      deep: true,
    },
    urlUserInfo: {
      handler: "genderHandle",
      immediate: true,
      deep: true,
    },
  },

  methods: {
    genderHandle() {
      if (this.urlUserInfo.gender == "女") {
        this.imgSrc = require("./img/bg.woman.png");
        this.gender = "女";
      }
      if (this.urlUserInfo.gender == "男") {
        this.imgSrc = require("./img/bg.man.png");
        this.gender = "男";
      }
    },

    dataHandle() {
      this.name = "张小明";
      this.department = "心血管内科";
      this.level = "";
      this.info = `走过的2023，\n
          注定不同凡响。\n
          回眸这一年，\n
          有欢笑、有泪水，\n
          有收获、有遗憾。\n
          这一年，每分每秒，\n
          回荡着奋斗的激情。\n
          这一年，每时每刻，\n
          燃烧着坚持的笃定，\n
          这一年，每月每日，\n
          留存着离去的温馨。\n
          在这辞旧迎新的日子，\n
          让我们一起，\n
          回望过去，\n
          展望明朝！`
        .split("\n")
        .map((item) => item);
    },

    //开始输入的效果动画
    begin() {
      this.letters = this.str.split("XX");
      for (var i = 0; i < this.letters.length; i++) {
        //1000表示每行显示1秒钟后显示下一行
        setTimeout(this.write(i), i * 1000);
      }
    },
    //开始删除的效果动画
    back() {
      /*let L=this.letters.length;
        for(var i=0;i<L;i++){
            setTimeout(this.wipe(i),i*50);
        }*/
    },
    //输入字母
    write(i) {
      return () => {
        let L = this.letters.length;
        this.words.push(this.letters[i]);
        let that = this;
        /*如果输入完毕，在2s后开始删除*/
        if (i == L - 1) {
          setTimeout(function () {
            that.back();
          }, 2000);
        }
      };
    },
    //擦掉(删除)字母
    wipe(i) {
      return () => {
        this.words.pop(this.letters[i]);
        /*如果删除完毕，在300ms后开始输入*/
        if (this.words.length == 0) {
          this.order++;
          let that = this;
          setTimeout(function () {
            that.begin();
          }, 300);
        }
      };
    },
  },
};
</script>

<style scoped lang="scss">
.NurseMain {
  position: relative;
  padding: 50px 50px 0;
  box-sizing: border-box;
  background-image: url("./img/bg.png");
  height: 100%;
  overflow: hidden;
  .logo {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 55px;
    height: 57px;
    background-image: url("./img/logo.png");
  }
  .text-img {
    text-align: left;
    height: 61px;
    .hospital {
      height: 70px;
      width: 70px;
      font-size: 22px;
      color: #4891ff;
      .year {
        margin-left: 8px;
        font-size: 42px;
      }
    }
    .year-forge {
      height: 42px;
      font-size: 22px;
      color: #333333;
      .year {
        margin-left: 8px;
        font-size: 42px;
        color: #4891ff;
      }
    }
    .year-b-text {
      margin-top: 8px;
      font-size: 22px;
    }
  }
  .person-info {
    margin-top: 34px;
    text-align: left;
    .name {
      font-size: 30px;
    }
    .department {
      font-size: 21px;
    }
    .department-level {
      display: inline-block;
      margin-top: 4px;
      padding: 0 4px;
      border-radius: 2px;
      background-color: #4891ff;
      color: #fff;
      font-size: 16px;
      .level {
        margin-left: 10px;
      }
    }
  }
  .is-sex {
    position: absolute;
    top: 32px;
    right: 8px;
    width: 190px;
    height: 284px;
    &.男 {
      max-width: 190px;
    }
    &.女 {
      max-width: 190px;
    }
  }
  .typer {
    position: relative;
    z-index: 2;
  }
  .info-slogan {
    margin-top: 20px;
    color: #4891ff;
    font-size: 16px;
    font-family: "ss-m", sans-serif;
    text-align: center;
    width: 325px;
    padding-bottom: 30px;
    padding-top: 30px;
    margin-left: -25px;
    background-image: url("./img/bg.text.png");
    background-size: cover;
    background-repeat: no-repeat;
    .the-column {
      //   height: 14px;
      padding-bottom: 3px;
      & + .the-column {
        /*margin-top: 12px;*/
      }
    }
  }
}
</style>
