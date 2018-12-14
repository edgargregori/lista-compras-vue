<template>
  <div id="products" class="box">
    <div class="products--header has-text-centered">
      <i class="fa fa-2x fa-user-circle"></i>
    </div>
    <div class="product-list">

		
      <div v-for="productItem in itemsLessThanTen" id="productItem.nombre" name="productItem.id"  :key="productItem" class="product-list--item">
					<product-list-item  :productItem="productItem" v-bind="productItem" />
     </div>

      <div v-for="productItem in filtroTickeados" id="productItem.nombre" name="productItem.id"  :key="productItem" class="product-list--item">
					<product-list-item  :productItem="productItem"  v-bind="productItem"/>
     </div>
    </div>
    <div class="product-count has-text-right">
			<span class="has-text-weight-bold">Nro de productos:{{ idProductItem - 1 }} </span>
    </div>
			<ProductAddItem />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductListItem from './ProductListItem';
import ProductAddItem from './ProductAddItem';

export default {
  name: 'ProductList',
  computed: {
    ...mapGetters([
      'productItems',
			'idProductItem',
			//'cartItems'
    ]),
		itemsLessThanTen: function() {
		return this.productItems.filter(function(item) {
			return item.tickeado === false;
			//return item.precio > 10;
			})
		},
		filtroTickeados: function() {
		return this.productItems.filter(function(item) {
			return item.tickeado === true;
			//return item.precio > 10;
			})
		},


  },
  created() {
    this.$store.dispatch('getProductItems');
    this.$store.dispatch('getCartItems');
  },
  components: {
    ProductListItem,
		ProductAddItem
	},
	data () {
		return {

		}
	},
	methods: {

		}
}
</script>

<style scoped>

  .removed {
    color: gray;
	text-decoration: line-through;
  }
  .removed label {
    text-decoration: line-through;
  }
  li {
    list-style-type: none;
  }
  li span {
    margin-left: 5px;
  }


.tag {
  cursor: pointer;
}

.products--header {
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 15px;
}

.product-list {
  padding-top: 10px;
}

.product-list--item {
  padding: 10px 0;
}
</style>
