<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :address-info="areaInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @delete="onDelete"
      @change-area="changeArea"
      @change-default="changeDefault"
      @save="onSave"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { fetchUpdUserAddress,fetchDelUserAddress } from "../api/address.js";
export default {
  data() {
    return {
      areaList,
      code: "",
      isDefault: "",
      fromAddressInfo: JSON.parse(this.$route.params.addressInfo), //当前点击的地址
    };
  },
  created() {
    this.code = this.fromAddressInfo.areaCode;
    this.isDefault = this.fromAddressInfo.isDefault;
  },
  computed: {
    areaInfo() {
      let address = JSON.parse(this.$route.params.addressInfo);
      address.isDefault = !!address.isDefault;
      address.areaCode = address.areaCode.split("-")[2];
      return address;
    },
  },
  methods: {
    async onSave(areaInfo) {
      let user_id = this.$store.state.userInfo.id
      areaInfo.isDefault = areaInfo.isDefault ? 1 : 0
      areaInfo.country = areaInfo.county
      let updData = {
        ...areaInfo,
        areaCode:this.code 
      }
      console.log(updData);
      let {message,status} = await fetchUpdUserAddress(areaInfo.id,updData)
      this.$toast(message);
      if(status === 0) {
        this.$router.back()
      }
    },
    async onDelete(areaData) {
      let {message,status} = await fetchDelUserAddress(areaData.id)
      if(status === 0 ){
        this.$router.back()
      }
    },
    changeArea(areaCodes) {
      this.code = areaCodes.map(item=> item.code).join('-')
    },
    changeDefault() {},
  },
};
</script>

<style>
</style>