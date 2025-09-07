export interface ClaimStatus {
  name: string;
  count: number;
  color: string;
}

export interface ClaimProcessingTime {
  day: string;
  time: number;
}

export interface ClaimsData {
  status: ClaimStatus[];
  processingTime: ClaimProcessingTime[];
}
