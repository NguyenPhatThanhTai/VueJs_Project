<template>
    <div id="detail" class="UserContain">
      <HeaderUser/>
        <main id="UserMain">
        <div class="left_content">
            <div class="listCategory" >
                <div id="Category"
                    v-for="cate in data"
                    v-bind:key="cate.id"
                    v-bind:style="{ 'background-image': 'url(' + cate.imageCategory + ')' }"
                    v-on:click="GoToDetail(cate.id)">
                    
                    <span>{{cate.nameCategory}}</span>
                </div>
                
                
            </div>
        </div>
        <RightNavigation/>
        <FooterUser/>
        </main>
    </div>
</template>

<style>
        .listCategory {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            align-content: center;
            justify-content: center;
        }
        
        .listCategory #Category {
            width: 45%;
            height: 200px;
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px;
        }
        
        .listCategory #Category span {
            background-color: rgba(114, 114, 114, 0.616);
            padding: 10px;
            width: 100%;
            text-align: center;
            font-weight: bold;
            color: #fff;
        }
    
    @media only screen and (max-width: 600px) {
        body {
            margin: 0;
            position: relative;
        }
    }
</style>

<script>
import HeaderUser from './HeaderUserComponent.vue'
import FooterUser from './FooterUserComponent.vue'
import RightNavigation from './RightNavigation.vue'
import axios from "axios";

export default {
  name: 'Detail',
  components:{
      HeaderUser,
      FooterUser,
      RightNavigation
  },
  data: function(){
    return {
      data : ''
    }
  },
  async mounted() {
    let data = await axios.get(
      "http://localhost:8080/api/get-list-category"
    );
    this.data = data.data.info;
    //this.ListBook = data.listDocs;
    this.dataReady = true;
    console.log(this.data);
  },
  async created() {
    this.bookId = this.$route.query.book
  },
  methods:{
    GoToDetail(id){
        this.$router.push({
            path: 'category/detail', 
            query: { cate: id }
        });
    }
  }
}
</script>