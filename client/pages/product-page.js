const ProductPageComponent = {



  template: `
    <div class="row">
     <product
     v-for="product in categoryFilteredProducts"
     v-bind:item="product"
     v-bind:key="product._id"
     ></product>
    </div>
  `,
  created() {
    http.get('/rest/products').then((response)=> {
      this.products = response.data;
    }).catch((error) => {
      console.log(error);
    });
  },
  data() {
    return {
      products: []
    }
  },
  computed:{
    categoryFilteredProducts: function(){
      return this.products.filter((product)=>{
        if(!this.$route.params.category){
          return true; // if no category selected, do not filter
        }
        for(let category of product.categories){
          //console.log("category.name", category.name);
          //console.log(" this.$route.params.category",  this.$route.params.category);
          if(category.name == this.$route.params.category){
            return true; // found matching category
          }
        }
      });
    }
  }
}