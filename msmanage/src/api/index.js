import {get, post} from "./http";

//判断管理员是否登录成功
export const getLoginStatus = (params) => post(`admin/login/status`,params);

//添加歌手
export const setSinger = (params) => post('singer/add',params);

//查询歌手
export const allSinger = () => get('singer/');

//模糊查询歌手
export const selectSingerByName = (params) => post(`singer/name`,params);

//修改歌手
export const updateSinger = (params) => post('singer/update',params);

//删除歌手
export const delSinger = (params) => post(`singer/delete/`,params);

//根据歌手id查询歌曲
export const songOfSId = (singerId) => get(`song/singer/${singerId}`);

//返回所有歌曲
export const allSong = () => get(`song/`);

//修改歌曲
export const updateSong = (params) => post('song/update',params);

//删除歌曲
export const delSong = (params) => post(`song/delete/`,params);

//根据歌曲id查询歌曲对象
export const songOfId = (id) => get(`song/key/${id}`);

//歌名查找歌曲
export const songOfSName = (name) => get(`song/name/${name}`);

//根据歌曲名获取歌曲对象
export const songOfSingerName = (name) => post(`song/select/${name}`);

//添加歌单
export const setSongList = (params) => post('songList/add',params);

//查询歌单
export const allSongList = () => get(`songList/`);

//修改歌单
export const updateSongList = (params) => post('songList/update',params);

//删除歌单
export const delSongList = (params) => post(`songList/delete`,params);

//模糊查询歌单
export const selectSListByName = (name) => get(`/songList/title/${name}`);

//根据歌单id查询歌曲列表
export const listSongOfSongId = (id) => get(`listSong/${id}`);

//删除歌单
export const delListSong = (params) => post(`listSong/delete`,params);

//添加歌曲到歌单中
export const addSongInList = (params) => post('listSong/add',params);

//搜索歌单里的歌曲
export const selectSongsINSongList = (id,name) => get(`listSong/name/${id}/${name}`);

//添加用户
export const addConsumer = (params) => post(`consumer/add`,params);

//返回全部用户
export const allConsumer = () => get(`consumer/`);

//删除用户
export const delConsumer = (params) => post(`consumer/delete`,params);

//更新用户信息
export const updateConsumer = (params) => post(`consumer/update`,params);

//根据用户名查询
export const consumerOfName = (name) => get(`consumer/name/${name}`);

//检测用户名是否重复
export const verifyUsername = (name) => get(`consumer/verify/${name}`);

//指定用户的收藏列表
export const getCollectOfUserId = (userId) => get(`/collect/userId/${userId}`);
//删除用户收藏的歌曲
export const deleteCollection = (userId,songId) => post(`collect/delete/${userId}/${songId}`);

//通过歌名搜索某个用户的收藏歌
export const selectCollectByName = (userId,name) => get(`collect/name/${userId}/${name}`);