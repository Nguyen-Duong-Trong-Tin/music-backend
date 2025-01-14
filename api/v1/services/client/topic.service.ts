import { ETopicStatus } from "../../enums/topic.enum";
import TopicModel from "../../models/topic.model";

const find = async () => {
  const topics = await TopicModel.find({
    status: ETopicStatus.ACTIVE
  });
  return topics;
}

const findById = async (id: string) => {
  const topicExists = await TopicModel.findOne({
    _id: id,
    status: ETopicStatus.ACTIVE
  });
  return topicExists;
}

const findBySlug = async (slug: string) => {
  const topicExists = await TopicModel.findOne({ 
    slug: slug,
    status: ETopicStatus.ACTIVE
  });
  return topicExists;
}

const topicService = {
  find,
  findById,
  findBySlug
};
export default topicService;