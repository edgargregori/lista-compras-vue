<template>
  <div>

		<!--<li :class="{ 'removed': item.tickeado }">
			<div class="checkbox">
				<label>
					<input type="checkbox" v-model="item.tickeado"> {{ item.text }}
				</label>
			</div>
		</li> -->
				<label>
					<input type="checkbox" v-model="productItem.tickeado" :disabled="true" > 
					<label for="checkbox">{{ productItem.tickeado }}</label>
				</label>
	
    <h2 class="has-text-weight-bold">{{ productItem.nombre }} 
      <span
        @click="addCartItem(productItem) && tickeadoProduct()"
        class="tag is-primary is-pulled-right has-text-white">
        Al carro
      </span>
    </h2>
    <p >{{ productItem.descripcion }}</p>
    <span class="has-text-primary has-text-weight-bold">
      <i class="fa fa-usd"></i> {{ productItem.precio }}
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ProductListItem',
  props: ['productItem'],
	data () {
		return {
			tickeado: false
		}
	},
	computed: {

		usersByName: function() {
			return this.orderBy(this.users, 'name', 'asc').map(user => {
				return Object.assign(user, {
					roles: this.orderBy(user.roles, 'name', 'asc')
				});
			});
		}
	},
  methods: {
    ...mapActions([
      'addCartItem',
    ]),
		tickeadoProduct: function(){
			this.productItem.tickeado = true;
			//return productItem;	
		}
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
</style>
