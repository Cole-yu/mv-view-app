import stockUtils from '../utils/stockUtils.js';

function mapFilters(filters) {
  return filters.reduce((result, filter) => {
    result[filter] = function(...args) { return this.$options.filters[filter](...args); };
    return result;
  }, {});
}

export default {
  filters: {
    formatStockText: stockUtils.formatStockText,
    formatStockCode: stockUtils.formatStockCode,
    formatPrice: stockUtils.formatPrice,
    formatVolume: stockUtils.formatVolume,
    formatRatio: stockUtils.formatRatio,
    formatColor: stockUtils.formatColor,
    getStockType: stockUtils.getStockType,
    formatDate: stockUtils.formatDate,
  },

  methods: {
    ...mapFilters(['formatStockText', 'formatStockCode', 'formatPrice', 'formatVolume', 'formatRatio', 'formatColor', 'getStockType']),
  },

};
