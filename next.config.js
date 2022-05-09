const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/timegrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
]);

module.exports = withTM({
  reactStrictMode: false,
});
