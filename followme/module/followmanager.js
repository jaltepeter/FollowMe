import { FollowLinks } from "./followlinks.js";
import { socketName, socketAction } from "./socketinfo.js";
import { findTokenById, flagScope, flag } from "./utils.js";


export class FollowManager {

    static async summonFollower(token, movingToX, movingToY) {
        if (this.isLeader(token._id)) {
            let leader = findTokenById(token._id);
            let follower = findTokenById(this.getFollowerId(leader.id));
            let grid = canvas.scene.data.grid;

            let newX = leader.x;
            let newY = leader.y;

            // // handle horizontal
            // if (movingToX) {
            //     if (movingToX > leader.x) { // moving right
            //         newX -= follower.w;
            //     } else if (movingToX < leader.x) { // moving left
            //         newX += leader.w;
            //     }
            // } else {
            //     newX = leader.x;
            // }

            // // handle vertical
            // if (movingToY) {
            //     if (movingToY > leader.y) { // moving down
            //         newY -= follower.h;
            //     } else if (movingToY < leader.y) { // moving up
            //         newY += leader.h;
            //     }
            // } else {
            //     newY = leader.y;
            // }





            if (game.user.isGM) {
                await follower.update({
                    x: newX,
                    y: newY
                });
            } else {
                game.socket.emit(socketName, {
                    mode: socketAction.MoveToken,
                    tokenId: follower.id,
                    x: newX,
                    y: newY
                });
            }
        }
    }


    static async startFollowing(followerId, leaderId) {
        if (game.user.isGM) {
            let leader = findTokenById(leaderId);
            let follower = findTokenById(followerId);
            await leader.setFlag(flagScope, flag.follower, followerId);
            await follower.setFlag(flagScope, flag.leader, leaderId);
        } else {
            game.socket.emit(socketName, {
                mode: socketAction.StartFollow,
                followerId: followerId,
                leaderId: leaderId
            });
        }
    }

    static async stopFollowing(leaderId) {
        if (game.user.isGM) {
            let leader = findTokenById(leaderId);
            let follower = findTokenById(leader.getFlag(flagScope, flag.follower));
            await leader.unsetFlag(flagScope, flag.follower);
            await follower.unsetFlag(flagScope, flag.leader);
        } else {
            game.socket.emit(socketName, {
                mode: socketAction.StopFollow,
                followerId: leaderId
            });
        }
    }

    static getFollowerId(leaderId) {
        let token = findTokenById(leaderId);
        if (token) {
            return token.getFlag(flagScope, flag.follower) || undefined;
        } else return undefined;
    }

    static isFollower(tokenId) {
        let token = findTokenById(tokenId);
        if (token) {
            return token.getFlag(flagScope, flag.leader) != undefined;
        } else return false;
    }

    static isLeader(tokenId) {
        let token = findTokenById(tokenId);
        if (token) {
            return token.getFlag(flagScope, flag.follower) != undefined;
        } else return false;
    }

    static isFollowing(followerId, leaderId) {
        let token = findTokenById(followerId);
        if (token) {
            return token.getFlag(flagScope, flag.leader) == leaderId;
        } else return false;
    }

    static areFollowingEachother(firstTokenId, secondTokenId) {
        return this.isFollowing(firstTokenId, secondTokenId) || this.isFollowing(secondTokenId, firstTokenId);
    }
}