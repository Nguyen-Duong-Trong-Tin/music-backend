import { ETopicStatus } from "../enums/topic.enum";

interface ITopic {
  title: string;
  slug: string;
  description: string;
  avatar: string;
  status: ETopicStatus;
}

export default ITopic;