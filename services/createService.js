// Import model classes
import Zone from "../models/Zone.js";
import Region from "../models/Region.js";
import District from "../models/District.js";
import Ward from "../models/Ward.js";
import AppServer from "../index.js";

async function fetchZones() {
  try {
    // Fetch zones from the TCRA API
    const zones = await AppServer.tcraService.getZones();
    console.log("INFO: ZOne data fetched successfully.");
  } catch (error) {
    throw error;
  }
}

async function fetchRegions() {
  try {
    // Fetch regions from the TCRA API
    const regions = await AppServer.tcraService.getRegions();
    console.log("INFO: region data fetched successfully.");
  } catch (error) {
    throw error;
  }
}

async function fetchDistricts() {
  try {
    // Fetch districts from the TCRA API
    const districts = await AppServer.tcraService.getDistricts();
    console.log("INFO: district data fetched successfully.");
  } catch (error) {
    throw error;
  }
}

async function fetchWards() {
  try {
    // Fetch wards from the TCRA API
    const wards = await AppServer.tcraService.getWards();
    console.log("INFO: ward data fetched successfully.");
  } catch (error) {
    throw error;
  }
}

export default async function saveData() {
  try {
    // Save data to MongoDB
    await Zone.insertMany(fetchZones());
    await Region.insertMany(fetchRegions());
    await District.insertMany(fetchDistricts());
    await Ward.insertMany(fetchWards());
    console.log("Data created successfully!");
    return "Data created successfully!";
  } catch (error) {
    throw error;
  }
}
