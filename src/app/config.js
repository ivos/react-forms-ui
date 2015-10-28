var Config = {};

Config.appName = 'My App';

Config.dateFormat = 'D.M.YYYY';
Config.monthFormat = 'M.YYYY';
Config.timeFormat = 'H:mm';
Config.dateTimeFormat = Config.dateFormat + ' ' + Config.timeFormat;
Config.timestampFormat = Config.dateFormat + ' H:mm:ss';

export default Config;
