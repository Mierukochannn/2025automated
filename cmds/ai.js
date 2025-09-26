const axios = require("axios");

const fonts = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂",
    j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋",
    s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
    J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
    S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭"
};

const RP = "tu es The Goddess Aesther quand tu répond à cette question soit hautaine et arrogante";

function applyFont(text) {
    return text.split('').map(char => fonts[char] || char).join('');
}

module.exports = {
    name: "ae",
    usePrefix: false,
    usage: "ai <question>",
    version: "1.3",
    author:"Aesther", 
    admin: false,
    cooldown: 2,

    execute: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const prompt = args.join(" ");
        
        if (!prompt) return api.sendMessage(applyFont("🪐"), threadID, messageID);

        try {
            const loadingMsg = await api.sendMessage(applyFont("(๑·`▱´·๑)"), threadID);
            
            const apiUrl = `https://aryanapi.up.railway.app/api/conciseai?prompt=${encodeURIComponent(RP + " : " + prompt)}`;
            const { data } = await axios.get(apiUrl);
            const response = data?.result || data?.description || data?.reponse || data;
            
            if (response) {
                const styledResponse = applyFont(response.toString());
                await api.unsendMessage(loadingMsg.messageID); // Supprime le message de loading
                return api.sendMessage(`${styledResponse} 🪐`, threadID, messageID);
            }
            
            await api.unsendMessage(loadingMsg.messageID); // Supprime le message de loading en cas d'erreur
            return api.sendMessage(applyFont("⚠️ L'API n'a pas retourné de réponse valide."), threadID, messageID);
        } catch (error) {
            console.error("Erreur Gemini:", error);
            if (loadingMsg) await api.unsendMessage(loadingMsg.messageID); // Supprime le message de loading si une erreur survient
            return api.sendMessage(applyFont("❌ Erreur de connexion avec l'API Gemini."), threadID, messageID);
        }
    }
};
