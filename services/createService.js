/**
 * @description CreateService - A class that handles fetching data from TCRA API and saving it to MongoDB.
 * @version 1.0.0 MMXXIII
 * @author Kizito S.M.
 */
import Zone from "../models/Zone.js";
import Region from "../models/Region.js";
import District from "../models/District.js";
import Ward from "../models/Ward.js";
import tcraService from "./tcraService.js";

/**
 * @class CreateService
 * @description A class that handles fetching data from TCRA API and saving it to MongoDB.
 */
class CreateService {
  /**
   * @constructor
   * @description Creates an instance of the CreateService class.
   */
  constructor() {}

  /**
   * @description Fetches zones from the TCRA API.
   * @returns {Promise<Object[]>} An array of zone objects containing zoneId and zoneName.
   * @throws {Error} If there is an error while fetching the data.
   */
  async fetchZones() {
    try {
      const zones = await tcraService.getZones();
      console.log("ZONES:", zones);
      console.log("INFO: Zone data fetched successfully.");
      return zones;
    } catch (error) {
      console.log("ZONES:", await tcraService.getZones());
      throw error;
    }
  }

  /**
   * @description Fetches regions from the TCRA API.
   * @returns {Promise<Object[]>} An array of region objects containing region details.
   * @throws {Error} If there is an error while fetching the data.
   */
  async fetchRegions() {
    try {
      const regions = await tcraService.getRegions();
      console.log("INFO: region data fetched successfully.");
      return regions;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetches districts from the TCRA API.
   * @returns {Promise<Object[]>} An array of district objects containing district details.
   * @throws {Error} If there is an error while fetching the data.
   */
  async fetchDistricts() {
    try {
      const districts = await tcraService.getDistricts();
      console.log("INFO: district data fetched successfully.");
      return districts;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetches wards from the TCRA API.
   * @returns {Promise<Object[]>} An array of ward objects containing ward details.
   * @throws {Error} If there is an error while fetching the data.
   */
  async fetchWards() {
    try {
      const wards = await tcraService.getWards();
      console.log("INFO: ward data fetched successfully.");
      return wards;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetches data from TCRA API and saves it to MongoDB.
   * @returns {Promise<string>} A success message if data is saved successfully.
   * @throws {Error} If there is an error while fetching or saving the data.
   */
  async saveData() {
    try {
      // Fetch data from TCRA API
      const zones = await this.fetchZones();
      const regions = await this.fetchRegions();
      const districts = await this.fetchDistricts();
      const wards = await this.fetchWards();

      // Save data to MongoDB
      await Zone.insertMany(zones);
      await Region.insertMany(regions);
      await District.insertMany(districts);
      await Ward.insertMany(wards);

      console.log("Data created successfully!");
      return "Data created successfully!";
    } catch (error) {
      throw error;
    }
  }
}

export default CreateService;
