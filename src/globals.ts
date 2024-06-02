import { config } from 'dotenv';

config();

export enum ENV_VAR {
  API_URL = 'API_URL',
}

export const getEnvOrThrow = (envVar: ENV_VAR): string => {
  const value = process.env[envVar];
  if (!value) {
    throw new Error(`Environment variable ${envVar} is not set`);
  }
  return value;
};
