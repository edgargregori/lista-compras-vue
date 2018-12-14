<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <CartList />
        </div>
        <div class="column is-9">
          <ProductList />
        </div>

      </div>
    </div>

		<!-- 	<shopping-list-component>				</shopping-list-component> -->
  </div>
</template>

<script>
import CartList from './components/cart/CartList';
import ProductList from './components/product/ProductList';
//import ShoppingListComponent from './components/product/ShoppingListComponent'

export default {
  name: 'App',
  components: {
    CartList,
    ProductList,
		//ShoppingListComponent
  }
}
</script>

<style>
html, body {
  background: #F2F6FA;
}

#app {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 769px) {
  html, body {
    height: 100%;
  }
}
</style>
