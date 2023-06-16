export type DocumentType = {
  id: number;
  kode: string;
  namaDokumen: string;
  file: FileType | null;
  timeCreated: string | null;
  timeUpdated: string | null;
  timeDeleted: string | null;
};

export type FileType = {
  id: number;
  file: string;
  path: string;
  timeCreated: string;
};

export type HistoryType = {
  id: number;
  type: number;
  notes: string;
  timeCreated: string;
};
