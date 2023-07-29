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

  async getRegions() {
    try {
      const response = await this.instance.get(process.env.TCRA_ENDPOINT);
      const payload = [];
      var index = 1;
      response.data.forEach((region) => {
        var regions = {};
        regions.index = index++;
        regions.name = region.name;
        regions.id = region.id;
        regions.code = region.postcodeServiceId;
        payload.push(regions);
      });
      return payload;
    } catch (error) {
      throw error;
    }
  }
}

export default new TcraService();
