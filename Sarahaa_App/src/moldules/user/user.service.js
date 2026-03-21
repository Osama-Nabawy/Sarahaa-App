import { userRepo } from "../../DB/index.js";
export const  checkUserExist = async (data) => {
    return await userRepo.getOne(data)
}

export const createUser = async (data)=> {
    return await userRepo.create(data);
}