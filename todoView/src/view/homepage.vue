<template>
  <div class="todo">
    <h1>My living plan</h1>
    <div class="todo_add">
      <el-input placeholder="请输入内容" v-model="tempValue" @keyup.enter.native="addTodo">
        <template slot="append">
            <el-button icon="el-icon-plus" @click="addTodo"></el-button>
        </template>
      </el-input>
    </div>
    <div class="">
        <ul class="todo_list">
            <ol v-for="(todo, index) in list" :key="todo.item" class="todo_list_item" @click="removeTodo(todo)">
                {{index+1}}.{{todo.item}}
            </ol>
        </ul>
    </div>
  </div>
</template>

<script>
import { getTodoList, removeTodoItem, addTodoItem} from "@/api/todo";
export default {
  name: "todolist",
  data: () => {
    return {
      tempValue: '',
      list: [] // a list of what to do
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getTodoList()
        .then(res => {
            console.log(res);
            this.list = res.data.data || [];
        })
        .catch(err => {
          console.log("报错了");
        });
    },
    removeTodo (todo) {
        removeTodoItem(todo.item).then(res => {
            this.list = res.data.data || [];
        }).catch(err => {
            console.log(err);
        })
    },

    addTodo () {
        addTodoItem(this.tempValue.trim()).then(res => {
            if (res.data.code === 0){
                this.list = res.data.data;
                this.tempValue = '';
            } else {
                this.$message({
                    message: res.data.info,
                    type: 'warning'
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }
  }
};
</script>
<style lang="less">
    .todo {
        &_add{
            @width: 30rem;
            margin-top: 3rem;
            width: @width;
            margin-left:calc(~"50% - @{width}/2");
        }

        &_list{
            @width: 40rem;
            width: @width;
            list-style-type: decimal;
            margin-left:calc(~"50% - @{width}/2");

            &_item{
                text-align: left;
                font-size: 1.2rem;
                margin: 1rem;

                &:hover{
                    text-decoration:line-through;
                    text-decoration-color: rgb(158, 3, 3);
                }
            }
        }
    }
</style>
