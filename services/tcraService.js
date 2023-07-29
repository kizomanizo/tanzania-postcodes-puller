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

  // Get unique zones
  async getZones() {
    try {
      const regionsResponse = await this.instance.get(process.env.REGIONS_ENDPOINT);
      const regions = regionsResponse.data;

      const zonesMap = new Map(); // Use Map to store unique zones

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

  //Get all regions
  async getRegions() {
    try {
      const regions = await this.instance.get(process.env.REGIONS_ENDPOINT);
      const payload = [];
      regions.data.forEach((region) => {
        var regions = {};
        regions.id = region.id;
        regions.name = region.name;
        regions.level = region.locationLevel;
        regions.location = region.locationode;
        regions.postcode = region.postcodeServiceId;
        regions.zone = region.zone.id;
        payload.push(regions);
      });
      return payload;
    } catch (error) {
      throw error;
    }
  }

  // Get all districts
  async getDistricts() {
    try {
      const regionsResponse = await this.instance.get(process.env.REGIONS_ENDPOINT);
      const regions = regionsResponse.data;

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

  // Get all regions with districts and wards
  async getWards() {
    try {
      const regionsResponse = await this.instance.get(process.env.REGIONS_ENDPOINT);
      const regions = regionsResponse.data;

      const allWards = [];

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
