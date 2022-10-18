export function getMobileOperatingSystem() {
      if (is_iOS()) {
          return "iOS";
      } else {
        return "Android";
      }
}

export function is_iOS(): boolean {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }