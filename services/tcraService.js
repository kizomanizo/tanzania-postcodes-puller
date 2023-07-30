/**
 * @description TCRA Service - Responsible for fetching data from the TCRA API.
 * @author Kizito S.M.
 * @version 1.0.0. MMXXIII
 */

import axios from "axios";
import https from "https";
import "dotenv/config";

class TcraService {
  constructor() {
    this.instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }

  /**
   * @description Fetches unique zones from the TCRA API.
   * @returns {Promise<Object[]>} An array of unique zone objects containing zoneId and zoneName.
   * @throws {Error} If there is an error while fetching the data.
   */
  async getZones() {
    try {
      // Fetch all regions from the API
      const regionsResponse = await this.instance.get(process.env.REGIONS_ENDPOINT);
      const regions = regionsResponse.data;

      // Use a Map to store unique zones based on zoneId
      const zonesMap = new Map();

      // Iterate through regions to extract unique zones
      for (const region of regions) {
        const zoneId = region.zoneId;
        const zoneName = region.zone.name;

        // Check if the zoneId is already in the Map
        if (!zonesMap.has(zoneId)) {
          zonesMap.set(zoneId, zoneName);
        }
      }

      // Convert Map to an array of objects
      const zones = Array.from(zonesMap, ([zoneId, zoneName]) => ({ zoneId, zoneName }));

      return zones;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetches all regions from the TCRA API.
   * @returns {Promise<Object[]>} An array of region objects containing region details.
   * @throws {Error} If there is an error while fetching the data.
   */
  async getRegions() {
    try {
      // Fetch all regions from the API
      const regionsResponse = await this.instance.get(process.env.REGIONS_ENDPOINT);
      const regions = regionsResponse.data;
      const payload = [];

      // Transform region data and store in the payload array
      regions.data.forEach((region) => {
        var regionObj = {};
        regionObj.id = region.id;
        regionObj.name = region.name;
        regionObj.level = region.locationLevel;
        regionObj.location = region.locationCode;
        regionObj.postcode = region.postcodeServiceId;
        regionObj.zone = region.zone.id;
        payload.push(regionObj);
      });

      return payload;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetches all districts from the TCRA API.
   * @returns {Promise<Object[]>} An array of district objects containing district details.
   * @throws {Error} If there is an error while fetching the data.
   */
  async getDistricts() {
    try {
      // Fetch all regions from the API
      const regionsResponse = await this.instance.get(process.env.REGIONS_ENDPOINT);
      const regions = regionsResponse.data;

      // Fetch districts for each region concurrently and flatten the result
      const allDistricts = await Promise.all(
        regions.map(async (region) => {
          const districtsResponse = await this.instance.get(
            process.env.DISTRICTS_ENDPOINT + region.id
          );
          const districts = districtsResponse.data.map((district) => {
            return {
              id: district.id,
              name: district.name,
              level: district.locationLevel,
              location: district.locationCode,
              postcode: district.postcodeServiceId,
              region: region.id,
            };
          });
          return districts;
        })
      );

      // Flatten the array of arrays into a single array
      const flattenedDistricts = allDistricts.flat();
      return flattenedDistricts;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetches all wards with their respective districts and regions from the TCRA API.
   * @returns {Promise<Object[]>} An array of ward objects containing ward details.
   * @throws {Error} If there is an error while fetching the data.
   */
  async getWards() {
    try {
      // Fetch all regions from the API
      const regionsResponse = await this.instance.get(process.env.REGIONS_ENDPOINT);
      const regions = regionsResponse.data;

      const allWards = [];

      // Iterate through each region, fetch districts, and fetch wards for each district
      for (const region of regions) {
        const districtsResponse = await this.instance.get(
          process.env.DISTRICTS_ENDPOINT + region.id
        );
        const districts = districtsResponse.data;

        for (const district of districts) {
          const wardsResponse = await this.instance.get(process.env.WARDS_ENDPOINT + district.id);
          const wards = wardsResponse.data.map((ward) => {
            return {
              id: ward.id,
              name: ward.name,
              level: ward.locationLevel,
              location: ward.locationCode,
              postcode: ward.postcode,
              district: district.id,
            };
          });

          allWards.push(...wards);
        }
      }

      return allWards;
    } catch (error) {
      throw error;
    }
  }
}

export default new TcraService();
