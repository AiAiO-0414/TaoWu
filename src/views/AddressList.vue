<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { fetchGetUserAddress } from "../api/address.js";
export default {
  data() {
    return {
      chosenAddressId: 0,
      user_id: this.$store.state.userInfo.id,
      list: [],
    };
  },
  created() {
    this._fetchGetUserAddress();
  },

  methods: {
    onAdd(){
       this.$router.push('/addaddress')
    },
    async _fetchGetUserAddress() {
      let result = await fetchGetUserAddress(this.user_id);
      result.map((item) => {
        if(item.isDefault === 1) {
          this.chosenAddressId = item.id
        }
        let { province, country, addressDetail, city } = item;
        item.address = `${province}${city}${country}${addressDetail}`;
        return item;
      });
      this.list = result;
      console.log(result);
    },
    onAdd() {
      //   Toast("新增地址");
      this.$router.push("/addaddress");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
       this.$router.push("/addressedit/" + JSON.stringify(item));
    },
  },
};
</script>

<style>
</style>