const appName = "";

const {logger: loggerConfig} = require('../conf/config.json');

let {
  consoleModeEnable,
  fileModeEnable,
  logDirectory,
  fileRotationTime,
  logLevel,
} = loggerConfig;

let opts = {
  logDirectory: logDirectory,
  fileNamePattern: `${appName}-<date>.log`,
  dateFormat: "YYYY.MM.DD-HHa",
  // fileRotationTime: fileRotationTime
};

let manager;
if (fileModeEnable) {
    manager = require("simple-node-logger").createLogManager(opts);
    if(consoleModeEnable){
      manager.createConsoleAppender()
    }
} else if(consoleModeEnable) {
    manager = require("simple-node-logger").createLogManager();
}

const logger = manager.createLogger(appName);
logger.setLevel(logLevel)

const requestLogger = (req, res, next) => {
  logger.debug(
    `${new Date().toUTCString()} Request Payload For ${req.method} request to ${
      req.url
    } with body: ${JSON.stringify(req.body)}`
  );
  next();
};

const responseLogger = (req, res, data) => {
  if (!data?.error) {
    logger.debug(
      `${new Date().toUTCString()} Response Payload For ${
        req.method
      } request to ${req.url}: ${JSON.stringify(data)}`
    );
  } else if (data?.error) {
    logger.error(
      `${new Date().toUTCString()} Error in Response for ${req.method} : ${
        req.url
      } ${JSON.stringify(data.error)}`
    );
  }
};

module.exports = {
  logger,
  requestLogger,
  responseLogger
};
