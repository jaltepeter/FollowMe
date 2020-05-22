import { Settings } from "./settings.js";

export class FollowLinks {

    static get() {
        return Settings.getFollowLinks();
    }

    static set(links) {
        Settings.setFollowLinks(links);
    }

    static add(followerId, leaderId) {
        let currentLinks = this.get();

        currentLinks[followerId] = {
            leaderId: leaderId,
            x: 'x'
        };

        this.set(currentLinks);
    }

    static remove(followerId) {
        let links = this.get();
        delete links[followerId];
        this.set(links);
    }

}