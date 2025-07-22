export interface Coins {
  USDBRL: CoinsMetadata;
  USDBRLT: CoinsMetadata;
  EURBRL: CoinsMetadata;
  CNYBRL: CoinsMetadata;
  GBPBRL: CoinsMetadata;
  BTCBRL: CoinsMetadata;
  ETHBRL: CoinsMetadata;
  XRPBRL: CoinsMetadata;
}

export interface CoinsMetadata {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}
