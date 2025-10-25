import Queue from "bull";

const emailQueue = new Queue("emailQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6380, // updated port
  },
});

export default emailQueue;
