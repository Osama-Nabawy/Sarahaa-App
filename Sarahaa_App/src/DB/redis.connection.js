import { createClient } from "redis";
export const redisClient = createClient({
  url: "rediss://default:gQAAAAAAAWTKAAIncDFlZGRiMjIyMjI2MTk0ZTA2OGY4YzdhZmEwZmRmOTgzN3AxOTEzMzg@deep-polecat-91338.upstash.io:6379",
});
export const connectRedis = async () => {
  redisClient
    .connect()
    .then(() => {
      console.log("connect redis DB");
    })
    .catch((error) => {
      console.log("redis fail to connect");
    });
};
