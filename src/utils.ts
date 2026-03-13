interface AttendanceLog {
  deviceUserId: string;
  timestamp: Date;
  status: number;
  statusName: string;
  verifyType: number;
  verifyTypeName: string;
}

const statusMap: Record<number, string> = {
  0: "Check In",
  1: "Check Out",
  2: "Break Out",
  3: "Break In",
  4: "Overtime Start",
  5: "Overtime End",
};

const verifyTypeMap: Record<number, string> = {
  1: "Fingerprint",
  2: "Card",
  16: "Face",
  25: "Palm",
};

export function parseAttendanceLog(line: string): AttendanceLog {
  const parts = line.split("\t");

  return {
    deviceUserId: parts[0],
    timestamp: new Date(parts[1]),
    status: Number(parts[2]),
    statusName: statusMap[Number(parts[2])] || "Unknown",
    verifyType: Number(parts[3]),
    verifyTypeName: verifyTypeMap[Number(parts?.[3])] || "Unknown",
  };
}
