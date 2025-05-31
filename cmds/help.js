module.exports = {
    name: "help",
    usePrefix: false,
    usage: "help [command_name] (optional) | help all",
    version: "1.4",
    author:"𝙐𝙋𝘿𝘼𝙋𝙏𝙀𝘿 𝘽𝙔 Aesther", 

    execute({ api, event, args }) {
        const { threadID, messageID } = event;

        if (args.length > 0) {
            const commandName = args[0].toLowerCase();

            if (commandName === "all") {
                // Show all non-admin commands in alphabetical order
                const allCommands = Array.from(global.commands.values())
                    .filter(cmd => !cmd.admin)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((cmd, index) => `∅ ${cmd.name} (${cmd.usePrefix ? "uses prefix" : "no prefix"})\n   Usage: ${cmd.usage} 🌸`)
                    .join("\n\n");

                const allHelpMessage = `[🔵ᗩƐᔕƬHƐᖇ-ᗷOƬ🔵]
    ˚₊‧꒰ა /ᐠ - ˕ -マ໒꒱ ‧₊˚
    ━━━━━━━━━━━
    ${allCommands}
    ━━━━━━━━━━━
    📔𝗡𝗕 : 
    Use 'help [command_name]' for details.📑`;

                return api.sendMessage(allHelpMessage, threadID, messageID);
            }

            // Show details for a specific command (including admin-only)
            const command = global.commands.get(commandName);

            if (!command) {
                return api.sendMessage(`❌ Command '${commandName}' not found.`, threadID, messageID);
            }

            const commandHelpMessage = `
📰𝗜𝗡𝗙𝗢 - 𝗖𝗠𝗗
═════════════
◑Name: ${command.name}
◒Usage: ${command.usage}
◔Prefix Required: ${command.usePrefix ? "✅ Yes" : "❌ No"}
◕author: ${command.author}
◑Admin Only: ${command.admin ? "✅ Yes" : "❌ No"}
◔Version: ${command.version}`;

            return api.sendMessage(commandHelpMessage, threadID, messageID);
        }

        // Show only 5 random non-admin commands
        const commandArray = Array.from(global.commands.values())
            .filter(cmd => !cmd.admin)
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 5)
            .map((cmd, index) => `∅ ${cmd.name} (${cmd.usePrefix ? "uses prefix" : "no prefix"})\n   Usage: ${cmd.usage} 🌸`)
            .join("\n\n");

        const helpMessage = `
[🔵ᗩƐᔕƬHƐᖇ-ᗷOƬ🔵]
˚₊‧꒰ა /ᐠ - ˕ -マ໒꒱ ‧₊˚ 
━━━━━━━━━━━
${commandArray}
━━━━━━━━━━━
📑𝗨𝘀𝗲 'help all'
📩 𝗕𝗢𝗧 𝗟𝗜𝗡𝗞 📩
https://two025automated.onrender.com/`;

        api.sendMessage(helpMessage, threadID, messageID);
    }
};
