import { userModel, ObjectId } from "../utils/database.ts";

class UserService {
  public findById(userId: string) {
    return userModel.findOne({ userId });
  }

  public async setHandle(userId: string, handle: string) {
    const taken = await userModel.findOne({ handle });

    if (taken?.userId) {
      return false;
    }

    const exists = await userModel.findOne({ userId });

    if (!exists?.userId) {
      await userModel.insertOne({
        _id: new ObjectId(),
        userId,
        handle,
      });

      return true;
    }

    await userModel.updateOne({ userId }, { $set: { handle } });

    return true;
  }
}

export const userService = new UserService();
