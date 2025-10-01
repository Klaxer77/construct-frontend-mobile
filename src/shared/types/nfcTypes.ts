export interface Scan {
  label: string;
  scanned_at: string;
}

export interface INfcHistroy {
  date: string;
  scans: Scan[];
}

export interface NfcTag {
  id: string;
  nfc_uid: string;
  label: string;
  created_at: string;
}