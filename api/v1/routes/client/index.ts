import { Express } from "express";

import userRoutes from "./user.route";
import topicRoutes from "./topic.route";
import songRoutes from "./song.route";
import favoriteSongRoutes from "./favoriteSong.route";

const clientRoutesV1 = (app: Express) => {
  const baseUrl = "/api/v1";

  app.use(`${baseUrl}/users`, userRoutes);
  app.use(`${baseUrl}/topics`, topicRoutes);
  app.use(`${baseUrl}/songs`, songRoutes);
  app.use(`${baseUrl}/favorite-songs`, favoriteSongRoutes);
}

export default clientRoutesV1;