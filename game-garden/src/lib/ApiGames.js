import axios from "axios";

export default class ApiGames {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
        this.client = axios.create({
            baseURL: baseUrl
        });
    }
    
    async get(url){
        return (await this.client.get(url)).data
    }

    async getGames(url = null, pageSize = 39){
        let request = url ? url : `/games?key=${apiKey}&page_size=${pageSize}`;
        return await this.get(request);
    }

    async getGamesByTitle(title, pageSize = 39){
        let request = `/games?key=${apiKey}&page_size=${pageSize}&search=${title}`;
        return await this.get(request);
    }

    async getNewPage(link) {
        return await this.get(link);
    }

    async getGameDetail(id) {
        var request = `/games/${id}?key=${apiKey}`;
        return await this.get(request);
    }

}

export const apiGames = new ApiGames("https://api.rawg.io/api");
const apiKey = "f14f586d30d149adbf1a2909acbe2b4d";
