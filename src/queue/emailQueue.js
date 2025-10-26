import Queue from "bull";

const emailQueue = new Queue("emailQueue", {
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6380,
  },
});

export default emailQueue;