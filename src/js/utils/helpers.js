export const wrapLinks = (str) => {
    const linkRegex = /\[(.+)\]\(((https|http)?:\/\/[^\s]+)\)|((https|http)?:\/\/[^\s]+)/gi;
            
    return str.replace(linkRegex, (match, p1, p2) => {
        if (match && (p1 && p2)) {
            return `<a href="${p2}" target="_blank">${p1}</a>`;
        } else if (match) {
            return `<a href="${match}" target="_blank">${match}</a>`;
        }
    });
};