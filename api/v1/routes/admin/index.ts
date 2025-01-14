import { Express } from "express";

import configs from "../../../../configs";

import deserializeUser from "../../middlewares/deserializeUser.middleware";
import restrictTo from "../../middlewares/restrictTo.middleware";

import userRoutes from "./user.route";
import topicRoutes from "./topic.route";
import songRoutes from "./song.route";

const clientRoutesV1 = (app: Express) => {
  const baseUrlAdmin = `/api/v1/${configs.PATH_ADMIN}`;

  app.use(`${baseUrlAdmin}/users`, userRoutes);

  app.use(
    `${baseUrlAdmin}/topics`,
    [deserializeUser, restrictTo(["ADMIN"])],
    topicRoutes
  );

  app.use(
    `${baseUrlAdmin}/songs`,
    [deserializeUser, restrictTo(["ADMIN"])],
    songRoutes
  );
}

export default clientRoutesV1;