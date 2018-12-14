<template>
  <div>
		<!-- <input v-model="newProduct.id" value="idProductItem">{{productItems.length + 1}} -->
		<input type="text" v-model="newProduct.nombre" placeholder="nombre" class="form-control">
		<input type="text" v-model="newProduct.descripcion" placeholder="descripcion" class="form-control">
		<input type="number" v-model="newProduct.precio" placeholder="precio" class="form-control">
    <span class="has-text-primary has-text-weight-bold">
      <button @click="addProductItem(newProduct)" class="button is-primary" type="button">Enlistar producto!</button>
    </span>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'ProductAddItem',
	data() {
		return {
			newProduct: {}
			
		}
	},
	computed: {
		...mapGetters([
			'productItems',
			'idProductItem'
		])
	},
  //props: ['productItem'],
  methods: {
    ...mapActions([
      'addProductItem'
    ])
  }
}
</script>

<style scoped>
.tag {
  cursor: pointer;
}
</style>
