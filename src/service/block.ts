import { createBlock } from "../utils/core.tsx";
import { blockModel, ObjectId } from "../utils/database.ts";

class BlockService {
  public findOne(author: string, module: string, version: string) {
    return blockModel.findOne({
      author,
      module,
      version,
    });
  }

  public async create(author: string, module: string, source: string) {
    const version = "0.1.0";

    await blockModel.insertOne({
      _id: new ObjectId(),
      author,
      module,
      version,
      description: "",
    });

    await createBlock({ author, module, version, source });
  }

  public findByAuthor(author: string) {
    return blockModel.find({
      author,
    });
  }

  public find() {
    return blockModel.find({});
  }
}

export const blockService = new BlockService();
