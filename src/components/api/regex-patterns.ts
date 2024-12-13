export const REGEX_PATTERN = {
    NUMBER_LIST: "^\\d+(?:,\\d+)*$",
    SPREADSHEET: "^(sheet:[A-Za-z0-9]+(?:,\\d+)?|https://docs\\.google\\.com/spreadsheets/d/[A-Za-z0-9_-]+/edit(?:#gid=\\d+)?)(?:\\?.*)?$",
    GOOGLE_DOC: "^(doc:[A-Za-z0-9]+|https://docs\\.google\\.com/document/d/[A-Za-z0-9_-]+/edit)(?:\\?.*)?$",
    WAR: "^(https://politicsandwar.com/nation/war/timeline/war=\\d+)$",
    CHANNEL: "^(https://discord\\.com/channels/\\d+/\\d+/\\d+)$",
    UUID: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
}