<template>
  <div class="home">
    <swiper/>
    <div class="section" v-for="(item,index) in List" :key="index">
      <div class="section-title" style="text-align: center" >
        {{item.name}}
      </div>
      <content-list :contentList="item.list"></content-list>
    </div>

  </div>

</template>

<script>
import Swiper from "@/components/Swiper";
import {allSinger, allSongList} from '../api/index';
import contentList from "@/components/ContentList";
import TheFooter from "@/components/TheFooter";
import SongList from "@/views/SongList";
import Singer from "@/views/Singer";
import SingerAlbum from "@/views/SingerAlbum";
import SongListAlbum from "@/views/SongListAlbum";

export default {
  name: "home",
  components:{
    TheFooter,
    Swiper,
    contentList,
    SongList,
    Singer,
    SongListAlbum,
    SingerAlbum
  },
  data() {
    return {
      List: [
        {name:"歌单",list: []},
        {name:"歌手",list: []},
      ]
    }
  },

  created() {
    this.getSongList();
    this.getSinger();
  },

  methods:{
    getSongList() {        //获取前十条歌单
      allSongList().then(
          (res) => {
        this.List[0].list = res.data.slice(0,10);
      }).catch((err) => {
        console.log(err);
      })
    },
    getSinger() {          //获取前十名歌手
      allSinger().then(
          (res) => {
            this.List[1].list = res.data.slice(0,10);
            // console.log(res.data);
          }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
home {
  margin-top: 60px;
}
.section {
  width: 100%;
  height: 800px;
  margin-top: 20px;
  /*padding: 0 120px 50px 120px;*/
  background-color: #ffffff;
  box-sizing: border-box;
}
.section-title {
  height: 60px;
  line-height: 60px;
  padding-top: 10px;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  color: #000000;
  box-sizing: border-box;
}
</style>
