import axios, { AxiosInstance } from 'axios';
import { getAddress } from 'ethers';

import { Points } from './types/points';
import { DEFAULT_API_URL } from './globals';

/**
 * AbsintheSdk class for interacting with the Absinthe API.
 */
export class AbsintheSdk {
  private axiosInstance: AxiosInstance;
  private campaignId: number;

  /**
   * Creates an instance of AbsintheSdk.
   *
   * @param {string} apiKey - The API key for authorization.
   * @param {number} campaignId - The ID of the campaign.
   * @param {string} [customApiUrl] - Optional custom API URL.
   */
  constructor(apiKey: string, campaignId: number, customApiUrl?: string) {
    this.campaignId = campaignId;
    this.axiosInstance = axios.create({
      baseURL: customApiUrl || DEFAULT_API_URL,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Distributes points for a specific event.
   *
   * @param {string} eventName - The name of the event.
   * @param {object} pointsData - The data of the points to be distributed.
   * @param {number} pointsData.points - The number of points.
   * @param {string} pointsData.address - The address to distribute points to.
   * @param {object} [pointsData.metadata] - Optional metadata as a JSON object.
   * @returns {Promise<Points>} - The distributed points.
   * @throws {Error} - If eventName or points are not provided or if metadata is invalid JSON or if address is invalid.
   */
  async distribute(
    eventName: string,
    pointsData: { points: number; address: string; metadata?: object },
  ): Promise<Points> {
    let address: string;
    if (!eventName) throw new Error('Event name is required');
    if (!pointsData.points) throw new Error('Points is required');
    if (pointsData.metadata) {
      try {
        JSON.stringify(pointsData.metadata);
      } catch (e) {
        throw new Error('Metadata must be a valid JSON object');
      }
    }

    try {
      address = getAddress(pointsData.address);
    } catch (e) {
      throw new Error('Invalid address');
    }

    const response = await this.axiosInstance.post<Points>('/points', {
      ...pointsData,
      address,
      eventName,
      campaignId: this.campaignId,
      metadata: pointsData.metadata ? JSON.stringify(pointsData.metadata) : undefined,
    });

    return response.data;
  }

  /**
   * Retrieves points for a specific address and event.
   *
   * @param {string} address - The address to retrieve points for.
   * @param {string} [eventName] - Optional event name to filter points.
   * @returns {Promise<Points[]>} - The retrieved points.
   * @throws {Error} - If address is invalid or if call fails.
   */
  async getPoints(address: string, eventName?: string): Promise<Points[]> {
    let address_: string;

    try {
      address_ = getAddress(address);
    } catch (e) {
      throw new Error('Invalid address');
    }

    const response = await this.axiosInstance.get<Points[]>('/points', {
      params: { address: address_, eventName, campaignId: this.campaignId },
    });
    return response.data;
  }
}

export default AbsintheSdk;
