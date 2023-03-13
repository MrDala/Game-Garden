import axios from "axios";

export default class ApiUsers {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async get(url) {
        return (await axios.get(`${this.baseUrl}${url}`)).data
    }
    async put(url, body) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        return (await axios.put(`${this.baseUrl}${url}`, body, headers));
    }
    async post(url, body) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        return (await axios.post(`${this.baseUrl}${url}`, body, headers)).data;
    }
    async set(url, body) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        return (await axios.set(`${this.baseUrl}${url}`, body, headers));
    }

    async getUser(email) {
        return await this.get(`/users/?email=${email}`);
    }

    async getWishlist(userId) {
        return await this.get(`/wishlists/?userId=${userId}`);
    }

    async removeFromWishlist(userId, gameId) {
        var wishlist = await this.getWishlist(userId);
        var wishlistId = wishlist[0].id;
        wishlist[0].gamesId = wishlist[0].gamesId.filter((id) => id !== gameId);
        return await this.put(`/wishlists/${wishlistId}`, { gamesId: wishlist[0].gamesId, userId: userId });
    }

    async addToWishlist(userId, gameId) {
        var wishlist = await this.getWishlist(userId);
        var wishlistId = wishlist[0].id;
        if (!wishlist[0].gamesId.includes(gameId)) {
            wishlist[0].gamesId.push(gameId);
        }
        return await this.put(`/wishlists/${wishlistId}`, { gamesId: wishlist[0].gamesId, userId: userId });
    }

    async getImage(userId) {
        return await this.get(`/images/${userId}.png`);
    }

    async createUser(user) {
        // Création de l'utilisateur
        const createdUser = await this.post('/users', user);

        // Création de la wishlist vide associée à l'utilisateur
        const wishlist = {
            userId: createdUser.id,
            gamesId: []
        };
        await this.post('/wishlists', wishlist);

        return createdUser;
    }


    async updateUser(user) {
        return await this.put(`/users/${user.id}`, user);
    }

}

export const apiUsers = new ApiUsers("http://localhost:3000");
