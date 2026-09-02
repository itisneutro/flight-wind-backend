export type WindRhumbStatus = 'draft' | 'published' | 'deleted';

export interface WindRhumb {
  id: number;
  name: string;
  shortName: string;
  description: string;
  imageKey: string;
  videoKey: string;
  status: WindRhumbStatus;
  rhumbAzimuthDeg: number;
  avgWindSpeedKmh: number;
  likes: number[];
}
