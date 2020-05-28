<template>
  <div class="hello">
    <form>
      <input type="text" style="display:none" />
      <input v-model="currentTask" type="text" />
      <input type="button" value="add!" @click="taskCreate" />
    </form>
    <table align="center" border="0">
      <tr>
        <th>task</th>
        <th>update</th>
        <th>delete</th>
      </tr>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td>
          <input v-model="task.taskname" type="text" />
        </td>
        <td>
          <input
            type="button"
            value="update"
            @click="taskUpdate(task.id, task.taskname)"
          />
        </td>
        <td>
          <input
            type="button"
            value="delete"
            @click="taskDelete(task.id, index)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "HelloWorld",
    data() {
    return {
    tasks: [],
    currentTask: "",
    frontUrl: "http://localhost:3000/"
    };
  },
  created: async function() {
    try {
      const tasks = await axios.get(this.frontUrl);
      this.tasks = tasks.data.task;
    } catch (err) {
      alert(JSON.stringify(err));
    }
  },
  methods: {
    taskCreate: async function() {
      try {
        const task = await axios.post(`${this.frontUrl}task/`, {
          task: this.currentTask
        });
        this.tasks.unshift(task.data);
        this.currentTask = "";
      } catch (err) {
        alert(JSON.stringify(err));
      }
    },
    taskDelete: async function(id, index) {
      try {
        await axios.delete(`${this.frontUrl}task/${id}`);
        this.currentTask = "";
        this.tasks.splice(index, 1);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    },
    taskUpdate: async function(id, val) {
      try {
        await axios.put(`${this.frontUrl}task/${id}`, {
          task: val
        });
        this.currentTask = "";
      } catch (err) {
        alert(JSON.stringify(err));
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
.table {
  height: 100%;
  text-align: center;
}
</style>