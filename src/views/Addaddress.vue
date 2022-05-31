<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-area="changeArea"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { fetchAddUserAddress } from "../api/address.js";

export default {
  data() {
    return {
      areaList,
      code:''
    };
  },
  methods: {
    async onSave(areaInfo) {
      let user_id = this.$store.state.userInfo.id
      areaInfo.isDefault = areaInfo.isDefault ? 1 : 0;
      areaInfo.country = areaInfo.county;
      let data = {
        ...areaInfo,
        areaCode:this.code 
      }
      let {message,status} = await fetchAddUserAddress(user_id,data)
      this.$router.back('/AddressList')
    },
    changeArea(areaCodes) {
      this.code = areaCodes.map(item=> item.code).join('-')
    },
  },
};
</script>

<style>
.van-address-list__bottom  button{
    background-color: #467ce8;
    border: 1px solid #467ce8;
}
</style>
