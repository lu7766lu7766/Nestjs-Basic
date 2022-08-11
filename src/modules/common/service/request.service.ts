import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestService {
  /**
   *
   * @param body
   * @returns [offset, perPage]
   */
  getPaginate(body) {
    const { page = 1, perPage = 9999 } = body;
    return [(page - 1) * perPage, perPage];
  }

  /**
   *
   * @param body
   * @returns [sortKey, sortType]
   */
  getSort(body) {
    const { sortKey, sortType = 'asc' } = body;
    return [sortKey, sortType];
  }
}
