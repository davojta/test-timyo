let startTime;

if (!window.performance) {
    startTime = process.hrtime();
    startTime = Math.round((startTime[0] * 1000) + (startTime[1] / 1000000));

    window.performance = {
        now() {
            const end = process.hrtime();
            return Math.round((end[0] * 1000) + (end[1] / 1000000));
        },
    };
}

export const debugMode = window.debugMode || (process.env.DEBUG === 'true');

const config = {
    mode: 'all',
    blackList: [
        'localStorage',
        'windowEventListener',
    ],
    whiteList: [],
};

const emptyFunction = () => {};
export default function debug(debugString, ...rest) {
    if (!debugMode) return;

    startTime = startTime || window.performance.now();

    window.timyoStartTime = startTime;
    // console.warn('Timyo: ' + arguments.callee.caller.toString() +' : ' + debugString);
    const delta = Math.round(window.performance.now() - startTime);
    console.warn(`Timyo (${delta}) : ` + debugString, ...rest);
}

export function logger(moduleName) {
    if (debugMode) {
        if (config.mode === 'all' && config.blackList.includes(moduleName)) return emptyFunction;

        return function (debugString, ...rest) {
            startTime = startTime || window.performance.now();

            window.timyoStartTime = startTime;
            // console.warn('Timyo: ' + arguments.callee.caller.toString() +' : ' + debugString);
            const delta = Math.round(window.performance.now() - startTime);
            console.warn(`${moduleName} (${delta}) : ` + debugString, ...rest);
        };
    } else {
        return emptyFunction;
    }
}

if (debugMode) {
    window.debug = debug;
    window.logger = logger;
} else {
    window.debug = () => {};
    window.logger = () => emptyFunction;
}
