interface AttendanceLog {
  deviceUserId: string;
  timestamp: Date;
  status: number;
  verifyType: number;
  verifyTypeName: string;
}

const verifyTypeMap: Record<number, string> = {
  0: "Unknown",
  1: "Fingerprint",
  2: "Password",
  3: "Card",
  15: "Face",
  25: "Palm",
};

export function parseAttendanceLog(line: string): AttendanceLog {
  const parts = line.split("\t");

  return {
    deviceUserId: parts[0],
    timestamp: new Date(parts[1]),
    status: Number(parts[2]),
    verifyType: Number(parts[3]),
    verifyTypeName: verifyTypeMap[Number(parts?.[4]) ?? 0],
  };
}
