import { ETopicStatus } from "../../enums/topic.enum";

import TopicModel from "../../models/topic.model";

const find = async () => {
  const topics = await TopicModel.find({});
  return topics;
}

const findById = async ({ id, status }: {
  id: string;
  status?: ETopicStatus;
}) => {
  interface IFind {
    _id: string;
    status?: ETopicStatus;
  }

  const find: IFind = { _id: id };
  if (status) { find.status = status; }

  const topicExists = await TopicModel.findOne(find);
  return topicExists;
}

const topicService = {
  find,
  findById
};
export default topicService;