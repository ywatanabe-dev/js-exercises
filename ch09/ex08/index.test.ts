import { State, AlarmClock, Action } from "./index.ts";

// stateはAlarmClockクラスでprivateのため、overrideできない。
// テスト用ドライバクラスは継承でなく、委譲で実現する。
class TestClock {
  state;
  constructor(state: State) {
    this.state = state;
  }

  setAlarm(): Action {
    return AlarmClock.prototype.setAlarm.bind(this)();
  }

  cancelAlarm(): Action {
    return AlarmClock.prototype.cancelAlarm.bind(this)();
  }

  reachedToAlarmTime(): Action {
    return AlarmClock.prototype.reachedToAlarmTime.bind(this)();
  }

  snooze(): Action {
    return AlarmClock.prototype.snooze.bind(this)();
  }

  elapseSnoozeTime(): Action {
    return AlarmClock.prototype.elapseSnoozeTime.bind(this)();
  }
}

describe("State: normal", () => {
  test("setAlarm()", () => {
    const clock = new TestClock("normal");
    expect(clock.setAlarm()).toBe("none");
    expect(clock.state).toBe("alarmSet");
  });

  test("cancelAlarm()", () => {
    const clock = new TestClock("normal");
    expect(clock.cancelAlarm()).toBe("none");
    expect(clock.state).toBe("normal");
  });

  test("reachedToAlarmTime()", () => {
    const clock = new TestClock("normal");
    expect(clock.cancelAlarm()).toBe("none");
    expect(clock.state).toBe("normal");
  });

  test("snooze()", () => {
    const clock = new TestClock("normal");
    expect(clock.snooze()).toBe("none");
    expect(clock.state).toBe("normal");
  });

  test("elapseSnoozeTime()", () => {
    const clock = new TestClock("normal");
    expect(clock.elapseSnoozeTime()).toBe("none");
    expect(clock.state).toBe("normal");
  });
});

describe("State: alarmSet", () => {
  test("setAlarm()", () => {
    const clock = new TestClock("alarmSet");
    expect(clock.setAlarm()).toBe("none");
    expect(clock.state).toBe("alarmSet");
  });

  test("cancelAlarm()", () => {
    const clock = new TestClock("alarmSet");
    expect(clock.cancelAlarm()).toBe("none");
    expect(clock.state).toBe("normal");
  });

  test("reachedToAlarmTime()", () => {
    const clock = new TestClock("alarmSet");
    expect(clock.reachedToAlarmTime()).toBe("soundAlarm");
    expect(clock.state).toBe("alarmSounding");
  });

  test("snooze()", () => {
    const clock = new TestClock("alarmSet");
    expect(clock.snooze()).toBe("none");
    expect(clock.state).toBe("alarmSet");
  });

  test("elapseSnoozeTime()", () => {
    const clock = new TestClock("alarmSet");
    expect(clock.elapseSnoozeTime()).toBe("none");
    expect(clock.state).toBe("alarmSet");
  });
});

describe("State: alarmSounding", () => {
  test("setAlarm()", () => {
    const clock = new TestClock("alarmSounding");
    expect(clock.setAlarm()).toBe("none");
    expect(clock.state).toBe("alarmSounding");
  });

  test("cancelAlarm()", () => {
    const clock = new TestClock("alarmSounding");
    expect(clock.cancelAlarm()).toBe("stopAlarm");
    expect(clock.state).toBe("normal");
  });

  test("reachedToAlarmTime()", () => {
    const clock = new TestClock("alarmSounding");
    expect(clock.reachedToAlarmTime()).toBe("none");
    expect(clock.state).toBe("alarmSounding");
  });

  test("snooze()", () => {
    const clock = new TestClock("alarmSounding");
    expect(clock.snooze()).toBe("stopAlarm");
    expect(clock.state).toBe("snoozing");
  });

  test("elapseSnoozeTime()", () => {
    const clock = new TestClock("alarmSounding");
    expect(clock.elapseSnoozeTime()).toBe("none");
    expect(clock.state).toBe("alarmSounding");
  });
});

describe("State: snoozing", () => {
  test("setAlarm()", () => {
    const clock = new TestClock("snoozing");
    expect(clock.setAlarm()).toBe("none");
    expect(clock.state).toBe("snoozing");
  });

  test("cancelAlarm()", () => {
    const clock = new TestClock("snoozing");
    expect(clock.cancelAlarm()).toBe("none");
    expect(clock.state).toBe("normal");
  });

  test("reachedToAlarmTime()", () => {
    const clock = new TestClock("snoozing");
    expect(clock.reachedToAlarmTime()).toBe("none");
    expect(clock.state).toBe("snoozing");
  });

  test("snooze()", () => {
    const clock = new TestClock("snoozing");
    expect(clock.snooze()).toBe("none");
    expect(clock.state).toBe("snoozing");
  });

  test("elapseSnoozeTime()", () => {
    const clock = new TestClock("snoozing");
    expect(clock.elapseSnoozeTime()).toBe("soundAlarm");
    expect(clock.state).toBe("alarmSounding");
  });
});
