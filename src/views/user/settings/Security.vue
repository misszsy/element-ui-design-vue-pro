<template>
  <el-row :gutter="24">
    <el-col :span="24">
      <ul class="el-list-items">
        <li class="el-list-item">
          <div class="el-list-item-meta">
            <h4 class="el-list-item-meta-title">
              <a>账户密码</a>
            </h4>
            <div class="el-list-item-meta-description">
              <span>当前密码强度</span>
              <span>：</span>
              <span>强</span>
            </div>
          </div>
          <ul class="el-list-item-action">
            <li>
            <el-button type="text">1123</el-button>
            </li>
          </ul>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-list-items {
  list-style: none;
  margin: 0;
  padding: 0;

  .el-list-item {
    border-bottom: 1px solid #e8e8e8;
    padding: 12px 0px;

    .el-list-item-meta-title {
      padding: 0;
      margin: 0;
      margin-bottom: 4px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      line-height: 22px;
      transition: all 0.3s;
    }

    .el-list-item-meta-description {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 22px;
    }

    .el-list-item-action {
      flex: 0 0 auto;
      margin-left: 48px;
      padding: 0;
      font-size: 0;
      list-style: none;

      > li {
        position: relative;
        display: inline-block;
        padding: 0 8px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>