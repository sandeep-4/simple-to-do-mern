const CornJob = require("cron").CronJob;

const Bus = require("../models/bus");
exports.checkDateAvilibity = (date) => {
  if (new Date(date) < new Date()) {
    return false;
  } else {
    return true;
  }
};

exports.runEveryMidnight = () => {
  new CornJob(
    "0 0 0 * * *",
    async function () {
      const buses = await Bus.find({});
      buses.map(async (bus) => {
        if (bus.journeyDate) {
          if (!exports.checkDateAvilibity(bus.journeyDate)) {
            bus.isAvialiable = false;
          }
        }
        await bus.save();
      });
    },
    null,
    true,
    "Asia/Kathmandu"
  );
};
