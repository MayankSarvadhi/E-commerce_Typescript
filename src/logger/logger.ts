export enum LogLevels {
    error = 'Error',
    warn = "Warn",
    info = "Info",
    debug = "Debug",
    trace = "Trace"
}

export function logger(level: LogLevels, message: string) {
    const now = new Date();
    const formattedMessage = `[${now}] ${level}: ${message}`;
    console.log(formattedMessage);

} 