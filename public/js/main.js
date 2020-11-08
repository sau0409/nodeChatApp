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
        let result = await axios.get(`${this.url}/api/get/messages`);
        result.data.forEach((el) => {
          this.messages.push(el);
        });
        console.log("get message triggered");
      } catch (err) {
        console.log(err);
      }
    },
    async postMessage(msg) {
      try {
        console.log("post message triggered");
        await axios.post(`${this.url}/api/post/message`, msg);
      } catch (err) {
        console.log(err);
      }
    },
    addMessage(message) {
      console.log("add message triggered");
      this.messages.push(message);
    },
  },
  created() {
    console.log(window.location.hostname);
    this.getMessages();
    
  },
  computed: {
    url() {
      if(window.location.hostname !== "localhost") {
        return "https://warm-earth-32530.herokuapp.com"
      }
      else {
        return "http://localhost:3000"
      }
    }
  }
});
