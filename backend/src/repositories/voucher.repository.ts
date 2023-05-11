import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, createBelongsToAccessor, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {State, Voucher, VoucherRelations} from '../models';
import { StateRepository } from './state.repository';

export class VoucherRepository extends DefaultCrudRepository<
  Voucher,
  typeof Voucher.prototype.voucher_id,
  VoucherRelations
> {
  public readonly state: BelongsToAccessor<
    State,
    typeof Voucher.prototype.state
  >
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('StateRepository')
    stateRepositoryGetter: Getter<StateRepository>
  ) {
    super(Voucher, dataSource);
    this.state = this.createBelongsToAccessorFor(
      'voucher_state',
      stateRepositoryGetter
    )
    // Enable Inclusion with relation --> join
    this.registerInclusionResolver('voucher_state', this.state.inclusionResolver);
  }
}
