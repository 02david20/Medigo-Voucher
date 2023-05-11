import {Entity, belongsTo, hasOne, model, property} from '@loopback/repository';
import { State } from './state.model';

@model()
export class Voucher extends Entity {

  @property({
    type: 'number',
    id: true
  })
  voucher_id?: number;

  @property({
    type: 'string',
  })
  kind: string;

  @property({
    type: 'string',
  })
  code: string;

  @property({
    type: 'date',
  })
  start_date: string;

  @property({
    type: 'date',
  })
  end_date: string;

  @property({
    type: 'date',
  })
  create_at: string;

  @belongsTo(() => State, {name: "voucher_state"})
  state?: number;

  @property({
    type: 'number',
  })
  maxUse: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Voucher>) {
    super(data);
  }
}

export interface VoucherRelations {
  // describe navigational properties here
}

export type VoucherWithRelations = Voucher & VoucherRelations;
