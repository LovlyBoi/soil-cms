<template>
  <div class="not-found">
    <div class="wrapper">
      <div class="not-found-image">
        <img src="../../assets/img/404.png" alt="404">
      </div>
      <div class="message">
        <h2>OOPS!</h2>
        <h3>404 Page Not Found</h3>
        <p>请检查输入的 URL 是否正确，或点击下方的按钮返回主页。</p>
        <el-button type="primary" round>返回主页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    display: flex;

    .not-found-image {
      width: 45vw;
      height: 25vw;

      img {
        width: 100%;
      }
    }

    .message {
      width: 40vw;
      height: 25vw;

      h2 {
        color: rgb(21, 130, 240);
        font-size: 30px;
        font-weight: bolder;
        margin: 40px 0;
      }

      h3 {
        font-weight: bold;
        font-size: 20px;
        margin: 30px 0;
      }

      p {
        margin: 30px 0;
      }
    }
  }
}
</style>
