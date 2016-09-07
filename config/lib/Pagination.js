'use strict';

class Pagination {
  /**
   * constructor - description
   *
   * @param  {number} pageSize   页面大小
   * @param  {number} pageNum    页数 从0开始
   * @param  {number} totalCount 总数
   * @param  {Array} data       数据
   */
  constructor(pageSize, pageNum, totalCount) {
    this.pageSize = parseInt(pageSize, 0) || 5;
    this.pageNum = parseInt(pageNum, 0) || 0;
    this.totalCount = parseInt(totalCount, 0);
    this.totalPage = parseInt((this.totalCount % this.pageSize > 0) ? (this.totalCount /
      this.pageSize + 1) : this.totalCount / this.pageSize, 0);
    this.upPage = (this.pageNo > 1) ? this.pageNo - 1 : this.pageNo;
    this.nextPage = (this.pageNo === this.totalPage) ? this.pageNo : this.pageNo +
      1;
    this.data = [];
  }

}

module.exports = Pagination;
