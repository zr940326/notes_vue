//笔记输入框
const Editor={
   props:[
       'entityObject'
   ],
   data(){
       return {
           entity:this.entityObject
       }
   },
   template:`
      <div class="ui form">
        <div class="field">
          <textarea
             rows="5"
             placeholde="写点东西..."
             v-model="entity.body">
          </textarea>
        </div>
      </div> 
   `

}

//单个笔记本
const Note={
    props:[
        'entityObject'
    ],
    data(){
     return{
          entity:this.entityObject
     }

    },
    components:{
        'editor':Editor
    },
    template:` 
      <div class="item">
        <div class="content">
           <div> {{ entity.body || '新建笔记' }} </div>  

           <div class="extra">
               <editor
                   v-bind:entity-object="entity">
               </editor>
                
           </div>
        </div>
      </div>
    `
}


//笔记簿
const Notes={
    data(){
        return {
            notesData:[]
        }

    },
    created(){ //创建生命周期方法
        loadOp('xzNotes').then(
            collection=>{

                //查找全部，并进行排序
                const _dbNotesData=collection.chain()
                .find() 
                .simplesort('$loki','isdesc')
                .data()

                this.notesData=_dbNotesData
                console.log("获取到的笔记簿数据："+this.notesData)
            }
        )

    },
    methods:{

        //添加 笔记
        addNote(){
           loadOp('xzNotes').then((collection)=>{
               const entity=collection.insert({
                   body:'杨志'
               })
               //保存到数据库
               db.saveDatabase()
               //将数据交给列表
               this.notesData.unshift(entity)//在数据的第一行插入数据

           })

        }
    },
    //组合 组件
    components:{
        'note':Note
    },
    template:` 
       <div class="ui cotainer notes"> 

          <h4 class="ui horizontal divider header">
            <i class="paw icon"></i>
             Notes Vue
          </h4>

          <a class="ui right floated basic violet button"
           v-on:click="addNote"
          >添加笔记</a> 
          
          <div class="ui divided items">

             <note v-for="entity in notesData"
               v-bind:entityObject="entity"
               v-bind:key="entity.$loki"></note>
   
          </div>
       </div>  
    `
}



const app=new Vue({
 el:'#app',
 components:{
     'notes':Notes
 },
 template:` 
    <notes></notes> 
 
 ` 

})