import { Settings } from "./settings.js";
import { FollowManager } from "./followmanager.js";
import { findTokenById } from "./utils.js";


export class FollowHud {

    static renderFollowHud(app, html, data) {

        let leader = canvas.tokens.controlled.find(t => t.id == data._id);
        // let followerId = canvas.tokens.controlled[0].id;
        // let leaderId = data._id;

        // if exactly 1 selected and hud is from any leader then show the stop following button
        if (canvas.tokens.controlled.length == 1 && FollowManager.isLeader(leader.id)) {
            this.addStopFollowButton(html, leader.id, true);
        }

        // if exactly 2 is selected (follower and leader)
        else if (canvas.tokens.controlled.length == 2) {
            // if only two are selected, the follower is the token who isnt the leader
            let follower = canvas.tokens.controlled.find(t => t.id != leader.id);


            // if the pair is linked - show the stop follow button
            if (FollowManager.isFollowing(follower.id, leader.id) && !FollowManager.isFollowing(leader.id, follower.id)) {
                this.addStopFollowButton(html, leader.id);
            }
            // if the pair is not linked AND the leader is not already a follower - show the mount button
            else {
                if (!FollowManager.isLeader(leader.id)) {
                    if (!FollowManager.areFollowingEachother(leader.id, follower.id)) {
                        this.addStartFollowButton(html, follower.id, leader.id);
                    }
                }
            }
        }
    }

    /**
     * Adds the follow me button to the token HUD
     * @param {Object} html - The source HTML
     * @param {Object} data - The source Data
     * @param {boolean} hasSlash - If true, include the red slash over the icon
     */
    static addStartFollowButton(html, followerId, leaderId) {
        let leader = findTokenById(leaderId);
        let follower = findTokenById(followerId);
        let button = this.getButton(html, `Have ${follower.name} start following ${leader.name}`);

        button.find('i').click(async (ev) => {
            FollowManager.startFollowing(followerId, leaderId);
            this.addSlash(button);
        });
    }

    static addStopFollowButton(html, leaderId) {
        let leader = findTokenById(leaderId);
        let follower = findTokenById(FollowManager.getFollowerId(leaderId));
        let button = this.addSlash(this.getButton(html, `Stop ${follower.name} from following ${leader.name}`));

        button.find('i').click(async (ev) => {
            FollowManager.stopFollowing(leaderId);
            this.removeSlash(button);
        });
    }

    static getButton(html, tooltip) {
        let button = $(`<div class="control-icon followme" title="${tooltip}"><i class="fas ${Settings.getIcon()}"></i></div>`);
        if (Settings.getHudTopBottom() == 'top') {
            html.find(Settings.getHudColumn()).prepend(button);
        } else {
            html.find(Settings.getHudColumn()).append(button);
        }

        return button;
    }

    /**
     * Adds a slash icon on top of the follow icon
     * @param {Object} button - The HUD button to add a slash on top of
     */
    static addSlash(button) {
        let slash = $(`<i class="fas fa-slash" style="position: absolute; color: tomato"></i>`);
        button.addClass("fa-stack");
        button.find('i').addClass('fa-stack-1x');
        slash.addClass('fa-stack-1x');
        button.append(slash);
        return button;
    }

    /**
     * Removes the slash icon from the button
     * @param {Object} button - The mount up button
     */
    static removeSlash(button) {
        let slash = button.find('i')[1];
        slash.remove();
        return button;
    }
}