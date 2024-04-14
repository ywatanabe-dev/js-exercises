// 目覚まし時計の状態
export type State =
  | "normal" // 通常
  | "alarmSet" // アラームセット中
  | "alarmSounding" // アラーム鳴動中
  | "snoozing"; // スヌーズ中

// イベント時に発生するアクション
export type Action =
  | "none" // 何もしない
  | "soundAlarm" // アラームを鳴らす
  | "stopAlarm"; // アラームを止める

// 目覚まし時計クラス
export class AlarmClock {
  private state: State;

  constructor() {
    this.state = "normal";
  }

  // アラーム設定イベント
  setAlarm(): Action {
    switch (this.state) {
      case "normal":
        this.state = "alarmSet";
        return "none";
      default:
        return "none";
    }
  }

  // アラーム解除イベント
  cancelAlarm(): Action {
    switch (this.state) {
      case "alarmSet":
        this.state = "normal";
        return "none";
      case "alarmSounding":
        this.state = "normal";
        return "stopAlarm";
      case "snoozing":
        this.state = "normal";
        return "none";
      default:
        return "none";
    }
  }

  // アラーム設定時刻到達イベント
  reachedToAlarmTime(): Action {
    switch (this.state) {
      case "alarmSet":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }

  // スヌーズイベント
  snooze(): Action {
    switch (this.state) {
      case "alarmSounding":
        this.state = "snoozing";
        return "stopAlarm";
      default:
        return "none";
    }
  }

  // スヌーズ設定時間経過イベント
  elapseSnoozeTime(): Action {
    switch (this.state) {
      case "snoozing":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }
}
