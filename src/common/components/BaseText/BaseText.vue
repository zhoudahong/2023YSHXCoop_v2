<template>
  <div class="BaseText font-ap-r">
    {{ text}}
    <i class="logo vci-bg-fill" />
  </div>
</template>

<script>
export default {
  name: "BaseText",
  props: {
    text: {
      type: String,
      default: "祝全院医护人员新年快乐，\n向白衣天使致敬！"
    }
  }
}
</script>

<style scoped lang="scss">
.BaseText {
  position: relative;
  /*color: #1d953f;*/
  color: coral;
  font-size: 16px;
  text-align: center;
  .logo {
    position: absolute;
    top: -32px;
    right: -10px;
    width: 139px;
    height: 138px;
    background-image: url("./img/logo.png");
  }
}
</style>
