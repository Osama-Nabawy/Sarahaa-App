export class DBRepository {
  nModel;
  constructor(model) {
    this.nModel = model;
  }
  async create(item) {
    return await this.nModel.create(item);
  }
  async update(fillter, data, options = { returnDocument: "after" }) {
    return await this.nModel.findOneAndUpdate(fillter, { $set: data }, options);
  }
  async getOne(fillter, projection = {}, options = {}) {
    return await this.nModel.findOne(
      fillter,
      (projection = {}),
      (options = {}),
    );
  }
  async exist(filter) {
    return (await this.getOne(filter)) ? true : false;
  }

  async getAll(filter, projection = {}, options = {}) {
    return await this.nModel.find(filter, projection, options);
  }
  async deleteOne(filter) {
    return await this.nModel.deleteOne(filter);
  }
}
