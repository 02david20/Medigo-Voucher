import { State } from "./state";

export interface Voucher {
  voucher_id?: number;

  kind: string;

  code: string;

  start_date: string;

  end_date: string;

  create_at: string;

  state: number;

  maxUse: number;

  voucher_state: any;
}
