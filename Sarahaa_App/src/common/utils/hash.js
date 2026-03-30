import bcrypt from "bcryptjs";
export async function hash(data) {
    return await bcrypt.hash(data.toString(),10);
}
export async function compare(data, hashedData) {
  return await bcrypt.compare(data, hashedData);
}