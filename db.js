
const db=new loki('xzNotes',{
 autoload:true,//自动加载
 autoloadCallback:databaseInitialize,//自动加载回调
 autosave:true,//自动保存存储
 autosaveInterval:3000,//多久保存

})

/**
 * 自动加载回调 方法
 */
function databaseInitialize(){
   const notes=db.getCollection('xzNotes')
   if(notes===null){
       db.addCollection('xzNotes')
   }

}

/**
 *  定义的 加载 回调
 */
function loadOp(collection){
  return new Promise(resolve =>{
      //加载数据库
      db.loadDatabase({},()=>{
          const _collection=db.getCollection(collection) || db.addCollection(collection)
          resolve(_collection)
      })
  })

}