export type WindRhumbStatus = 'draft' | 'published' | 'deleted';

export interface WindRhumb {
  id: number;
  name: string;
  shortName: string;
  description: string;
  imageKey: string;
  videoKey: string;
  status: WindRhumbStatus;
  rhumbGeographicAzimuthDeg: number;
  rhumbMagneticAzimuthDeg: number;
  likes: number[];
}
