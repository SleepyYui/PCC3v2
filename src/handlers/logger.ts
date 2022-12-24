const beautify = require('beautify.log').default;

function formatText({text}: { text: any }) {
    // placeholder
  return text;
}


module.exports = {

    startup({text}: { text: any }) {
        const prefix = '{fgCyan}[STARTUP] {reset}';
        const formattedText = formatText({text: prefix + text});
        beautify.log(formattedText);
    },

    info({text}: { text: any }) {
        const prefix = '{fgGreen}[INFO] {reset}';
        const formattedText = formatText({text: prefix + text});
        beautify.log(formattedText);
    },

    debug({text}: { text: any }) {
        if (process.env.DEV === 'true') {
            const prefix = '{fgBlack}[DEBUG] {reset}';
            const formattedText = formatText({text: prefix + text});
            beautify.log(formattedText);
        }
    },

    cmsg({text}: { text: any }) {
        const prefix = '{fgBlue}[MODULE] {reset}{fgMagenta}';
        const formattedText = formatText({text: prefix + text});
        beautify.log(formattedText);
    },

    warn({text}: { text: any }) {
        const prefix = '{fgYellow}[WARN] {reset}';
        const formattedText = formatText({text: `${prefix + text}`});
        beautify.log(formattedText);
    },

    error({text}: { text: any }) {
        const prefix = '{fgRed}[ERROR] {reset}';
        const formattedText = formatText({text: `${prefix + text}`});
        beautify.log(formattedText);
    },

    fatalError({err, origin, value}: { err: any , origin: any , value: any }) {
        if (value !== undefined) {
            const prefix = '{fgRed}{bright}[FATAL ERROR] {bright}';
            const formattedText = formatText({text: `${prefix}\n${err}\n${origin}\n${value}`});
            beautify.log(formattedText);
        }

    },
};
