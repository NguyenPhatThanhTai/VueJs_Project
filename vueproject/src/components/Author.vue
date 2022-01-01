<template>
    <div id="detail" class="UserContain">
      <HeaderUser/>
        <main id="UserMain">
        <div class="left_content">
            <div class="listAuthor">
                <div id="author"
                    v-for="author in data"
                    v-bind:key="author.id"
                    v-bind:style="{ 'background-image': 'url(' + author.imageCategory + ')' }"
                    v-on:click="GoToDetail(author.id)"
                >
                    <div id="portrait">
                        <img v-bind:src="'' + author.imageAuthor" />
                    </div>
                    <div id="scripsion">
                        <h3>{{author.nameAuthor}}</h3>
                        <p>{{author.description}}</p>
                    </div>
                </div>
            </div>
        </div>
        <RightNavigation/>
        <FooterUser/>
        </main>
    </div>
</template>

<style>
        .listAuthor #author {
            display: flex;
            margin: 10px;
        }
        
        .listAuthor #author #portrait img {
            width: 300px;
            padding: 10px 10px 10px 0;
        }
        
        .listAuthor #author #scripsion a {
            text-decoration: none;
            color: rgb(230, 28, 28);
        }
    
    @media only screen and (max-width: 600px) {
        body {
            margin: 0;
            position: relative;
        }
        .listAuthor #author {
                display: block;
                margin: 10px 10px 10px 0;
        }
        .listAuthor #author #portrait img {
            width: 100%;
            padding: 10px 10px 10px 0;
            margin: 10px;
        }
        .listAuthor #author #scripsion {
            margin: 10px;
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
      "http://localhost:8080/api/get-list-author"
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
            path: 'author/detail', 
            query: { author: id }
        });
    }
  }
}
</script>