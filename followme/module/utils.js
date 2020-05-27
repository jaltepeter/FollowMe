
export const flagScope = 'followme';
export const socketName = "module.followme";

export const flag = {
    leader: 'leader',
    follower: 'follower'
};

/**
 * Returns a token object from the canvas based on the ID value
 * @param {String} tokenId - The ID of the token to look for
 */
export function findTokenById(tokenId) {
    return canvas.tokens.placeables.find(t => t.id == tokenId);
}