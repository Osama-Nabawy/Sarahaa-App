import { createClient } from "redis";
import { Redis_Url } from "../common/index.js";
export const redisClient = createClient({
  url: Redis_Url,
});
export const connectRedis = async () => {
  redisClient
    .connect()
    .then(() => {
      console.log("connect redis DB");
    })
    .catch((error) => {
      console.log("redis fail to connect", error);
    });
};
