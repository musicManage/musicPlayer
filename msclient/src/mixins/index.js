import {mapGetters} from 'vuex';

export const mixin ={
    computed:{
      ...mapGetters([
          'userId',
          'id',
          'loginIn',
      ])
    },
    methods: {
        //获取图片地址
        attachImageUrl (srcUrl){
            if (srcUrl){
                return `${this.$store.state.HOST}/${srcUrl}`;
            }
        },
        //播放
        toplay: function (id,url,pic,index,songName,singerName,lyric){
            this.$store.commit('setId',id);
            this.$store.commit('setUrl',this.$store.state.HOST+url);
            this.$store.commit('setPicUrl',this.$store.state.HOST+'/'+pic);
            this.$store.commit('setListIndex',index);
            this.$store.commit('setTitle',songName);
            this.$store.commit('setArtist',singerName);
            this.$store.commit('setLyric',this.parseLyric(lyric));
            this.$store.commit('setIsActive',false);

            let param = new URLSearchParams();
            param.append('userId',this.userId);
            param.append('songId',id);
            if(this.loginIn){
                axios.post(`/collect/status`,param)
                    .then(res =>{
                        // console.log(res.data.code)
                        if (res.data.code == 1){
                            this.$store.commit('setIsActive',true);
                        }
                    })
            }
            // console.log(index);
        },
        //解析歌词
        parseLyric(text){
            let lines = text.split("\n");                   //将歌词按行分解成数组
            let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g; //时间格式的正则表达式
            let result = [];                                //返回值
            //对于歌词格式不对的直接返回
            if(!(/\[.+\]/.test(text))){
                return [[0,text]]
            }
            //去掉前面格式不正确的行
            while(!pattern.test(lines[0])){
                lines = lines.slice(1);
            }
            //遍历每一行，形成一个每行带着俩元素的数组，第一个元素是以秒为计算单位的时间，第二个元素是歌词
            for(let item of lines){
                let time = item.match(pattern);  //存前面的时间段
                let value = item.replace(pattern,'');//存后面的歌词
                for(let item1 of time){
                    let t = item1.slice(1,-1).split(":");   //取出时间，换算成数组
                    if(value!=''){
                        result.push([parseInt(t[0],10)*60 + parseFloat(t[1]),value]);
                    }
                }
            }
            //按照第一个元素--时间--排序
            result.sort(function(a,b){
                return a[0] - b[0];
            });
            return result;
        },
        //获取生日
        attachBirth(val){
            return val.substr(0,10);
        },
        //上传图片校验
        beforeUpdate(file) {
            const isImg = (file.type === 'image/jpeg')||(file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isImg) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            } else if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }

            return isImg && isLt2M;
        },
        //上传成功后的事务处理
        updateSuccess(res){
            let _this = this;
            if (res.code == 1){
                _this.getUSerMsg();
                _this.$notify({
                    title: '上传成功',
                    type: 'success',
                });
            } else {
                _this.$notify({
                    type:'error',
                    title:'上传失败',
                })
            }
        },

    }
}