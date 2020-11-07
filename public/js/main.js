Vue.component("message-history", {
  template: `<div class="container"><div v-for="(message, index) in messages" :key="index">
    <h4>{{message.name}}</h4>
    <p>{{message.text}}</p>
    </div></div>`,
  props: ["messages"],
});

const app = new Vue({
  el: "#app",
  data: {
    msg: "Welcome to vue",
    message: {
      name: "",
      text: "",
    },
    messages: [],
  },
  methods: {
    async getMessages() {
      try {
        let result = await axios.get("http://localhost:3000/api/get/messages");
        result.data.forEach((el) => {
          this.messages.push(el);
        });
        console.log(this.messages);
      } catch (err) {
        console.log(err);
      }
    },
    async postMessage(msg) {
      try {
        await axios.post("http://localhost:3000/api/post/message", msg);
      } catch (err) {
        console.log(err);
      }
    },
    addMessage(message) {
      this.messages.push(message);
    },
  },
  created() {
    this.getMessages();
  },
});
