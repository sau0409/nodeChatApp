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
        let result = await axios.get("https://warm-earth-32530.herokuapp.com/api/get/messages");
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
        await axios.post("https://warm-earth-32530.herokuapp.com//api/post/message", msg);
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
