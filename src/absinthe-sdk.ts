import axios, { AxiosInstance } from 'axios';

import { ENV_VAR, getEnvOrThrow } from './globals';
import { Points } from './types/points';

export class AbsintheSdk {
  private axiosInstance: AxiosInstance;
  private campaignId: number;

  constructor(apiKey: string, campaignId: number) {
    this.campaignId = campaignId;
    this.axiosInstance = axios.create({
      baseURL: getEnvOrThrow(ENV_VAR.API_URL),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async distribute(
    eventName: string,
    pointsData: { points: number; address: string; metadata?: object },
  ): Promise<Points> {
    const response = await this.axiosInstance.post<Points>('/points', {
      ...pointsData,
      eventName,
      campaignId: this.campaignId,
      metadata: pointsData.metadata ? JSON.stringify(pointsData.metadata) : undefined,
    });

    return response.data;
  }

  async getPoints(address: string, eventName?: string): Promise<Points[]> {
    const response = await this.axiosInstance.get<Points[]>('/points', {
      params: { address, eventName, campaignId: this.campaignId },
    });
    return response.data;
  }
}

export default AbsintheSdk;
