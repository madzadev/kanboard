export default function formatDDMMM(s) {
  var months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  var b = s.split(/\D/);
  return b[2] + " " + months[b[1] - 1];
}
