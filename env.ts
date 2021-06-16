import { cleanEnv, str, port, host } from "envalid";
import { config } from "dotenv";

const ENV = cleanEnv(config(), {
  NODE_ENV: str({ choices: ["development", "production"] }),
  PORT: port({ default: 443, devDefault: 3001 }),
  HOST: host({ default: "0.0.0.0", devDefault: "localhost" }),
});

export default ENV;
