import fs from 'fs-extra';
import { j as json } from './index-2b68e648.js';
import { G as GetMinuteStartNowTimestampUTC, B as BeginingOfDay } from './tool-153dc604.js';
import { S as StatusObj } from './helpers-1d8653cf.js';

async function POST({ request }) {
  const payload = await request.json();
  const monitor = payload.monitor;
  const localTz = payload.localTz;
  let _0Day = {};
  const now = GetMinuteStartNowTimestampUTC();
  const midnight = BeginingOfDay({ timeZone: localTz });
  for (let i = midnight; i <= now; i += 60) {
    _0Day[i] = {
      timestamp: i,
      status: "NO_DATA",
      cssClass: StatusObj.NO_DATA,
      index: (i - midnight) / 60
    };
  }
  let day0 = JSON.parse(fs.readFileSync(monitor.path0Day, "utf8"));
  for (const timestamp in day0) {
    const element = day0[timestamp];
    let status = element.status;
    if (_0Day[timestamp] !== void 0) {
      _0Day[timestamp].status = status;
      _0Day[timestamp].cssClass = StatusObj[status];
    }
  }
  return json(_0Day);
}

export { POST };
//# sourceMappingURL=_server-eaa8e639.js.map
