/**
 * 包含多個基於state的getter計算屬性的對象
 */
export default {

    totalCount(state) { // 總數量
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
    },
    totalPrice(state) { // 總金額
        return state.cartFoods.reduce((preTotal, food) => preTotal + (food.count * food.price), 0)
    },
}