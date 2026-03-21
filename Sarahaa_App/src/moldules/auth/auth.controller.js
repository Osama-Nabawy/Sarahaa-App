import { Router } from "express";
import { checkUserExist, createUser } from "../user/user.service.js";
import { hash, Message  } from "../../common/index.js";
import { encryption } from "../../common/utils/encription.js";
const router = new Router()

router.post("/signup", async(req, res, next) => {
    let { email,  phonenumber } = req.body;
    const user = await checkUserExist({
        $or: [
            { email: { $eq: email, $exists: true, $in: [null] } },
            { phonenumber: { $eq: phonenumber, $exists: true, $in: [null] } },
        ]
    })
    if (user) throw new ConflictDataException(Message.user.alreadyExist);
    req.body.password = await hash(req.body.password);
    phonenumber.toString()
    if (req.body.phonenumber) {
      req.body.phonenumber = encryption(phonenumber);
    }
    const createdUser = await createUser(req.body);
    return res.status(201).json({
      message: "done",
      success: true,
      data: { createdUser },
    });
    
})






export const authRouter = router;