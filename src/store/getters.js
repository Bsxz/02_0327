/*
* 包含多个基于state的getter计算属性的对象
*
* */
export default {
  totalCount (state) {
    return state.foodcart.reduce((preTotal, food) => preTotal + food.count, 0)
  },
  totalPrice (state) {
    return state.foodcart.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
<<<<<<< HEAD
  },
  positiveSize (state) {
    return state.ratings.reduce((preTotal, ratings) => preTotal + (ratings.rateType === 0 ? 1 : 0), 0)
=======
>>>>>>> d8106d107152237645cc0fb3c18a8875eea6f9cf
  }
}
