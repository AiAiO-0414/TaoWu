<template>
  <div class="search-container">
    <van-popup
      v-model="isShow"
      position="top"
      :style="{ height: '50%' }"
      :close-on-click-overlay="false"
    >
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
      <div class="searchWrap">
        <div class="card">
          <div class="header">
            <h4>搜索历史</h4>
            <i class="iconfont icon-trash" @click="clearHistory"></i>
          </div>
          <div v-if="historyValue.length>0" class="footer">
            <span
              v-for="(item,index) in historyValue"
              :key="index"
              @click="searchClick(item)"
            >{{item}}</span>
          </div>
          <div v-else class="text-center text">暂无搜索记录</div>
        </div>
        <van-divider />
        <div class="card">
          <div class="header">
            <h4>热门搜索</h4>
            <i :class="['iconfont',className]" @click="isEyes = !isEyes"></i>
            <!-- <i class="iconfont icon-guanbi-yanjing"></i> -->
          </div>
          <div v-if="isEyes" class="footer">
            <span v-for="(item,index) in hotData" :key="index" @click="searchClick(item)">{{item}}</span>
          </div>
          <div v-else class="text-center text">已隐藏热门搜索</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
let historyValue = JSON.parse(localStorage.getItem("historyValue") || "[]");
export default {
  data() {
    return {
      historyValue,
      isShow: true,
      value: "",
      hotData: ["充电宝", "夏季短裙", "口红"],
      isEyes: true,
    };
  },
  computed: {
    className() {
      return this.isEyes ? "icon-yanjing" : "icon-guanbi-yanjing";
    },
  },
  methods: {
    onSearch() {
      if (!this.historyValue.includes(this.value)) {
        this.historyValue.push(this.value);
        localStorage.setItem("historyValue", JSON.stringify(this.historyValue));
      }
      this.$router.push(`/SearchResult/${this.value}`);
    },
    onCancel() {
      this.$router.back();
    },
    clearHistory() {
      (this.historyValue = []), localStorage.removeItem("historyValue");
    },
    searchClick(item) {
      this.$router.push("/SearchResult/" + item);
    },
  },
};
</script>

<style lang="scss">
.search-container {
  .searchWrap {
    .card {
      padding: 6px;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4px;
      }

      .footer {
        display: flex;
        flex-wrap: wrap;
        margin-top: 15px;
        span {
          height: 30px;
          line-height: 30px;
          background: #f3f5f6;
          font-size: 14px;
          margin-right: 6px;
          padding: 2px 4px;
          text-align: center;
          border-radius: 6px;
          margin: 4px;
        }
      }
      .text {
        font-size: 12px;
        color: #ccc;
        margin-top: 20px;
      }
    }
  }
}
</style>