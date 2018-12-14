import axios from 'axios';

const state = {
  productItems: [] 
}

const mutations = {
  UPDATE_PRODUCT_ITEMS (state, payload) {
    state.productItems = payload;
  }
}

const actions = {
  getProductItems ({ commit }) {
    axios.get('/api/products').then((response) => {
      commit('UPDATE_PRODUCT_ITEMS', response.data)
    });
  },
  addProductItem ({ commit }, productItem) {
		productItem.id = state.productItems.length + 1;
    axios.post('/api/product', productItem).then((response) => {
      commit('UPDATE_PRODUCT_ITEMS', response.data)
    });
  },
 
  //addSelectProduct ({ commit }, productItem) {
	//	//productItem.id = state.productItems.length + 1;
  //  axios.post('/api/product', productItem).then((response) => {
  //    commit('UPDATE_PRODUCT_ITEMS', response.data)
  //  });
  //},
}

const getters = {
  productItems: state => state.productItems,
	idProductItem: state => {
		return state.productItems.length + 1	
	},
  //checkedProduct: state => state.productItems,
	//idProductItema: state => {
	//	return state.productItems.length + 1	
	//},


}

const productModule = {
  state,
  mutations,
  actions,
  getters
}

export default productModule;
