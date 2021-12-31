<template>
    <div id="detail" class="UserContain">
      <HeaderUser/>
        <main id="UserMain">
        <div class="left_content">
            <div class="decripsionCategory">
                <div id="pic">
                    <img v-bind:src="'' + data.image" /> 
                </div>
                <div id="scripsion">
                    <p>{{data.description}}</p>
                    <p></p>
                </div>
            </div>
            <div class="bookOfCategory">
                <div class="listBook">
                    <div class="detailBook"
                        v-for="cate in data"
                        v-bind:key="cate.id"
                        v-on:click="GoToDetail(cate.categoryData.id)"
                    >
                        <div id="coverBook">
                            <img v-bind:src="'' + data.imageDoc" />
                        </div>
                        <div id="descripsionBook">
                            <h3>{{cate.categoryData.id}}</h3>
                            <p>{{cate.categoryData.nameDocument}}</p>
                            <p>{{cate.categoryData.authorData.nameAuthor}}</p>
                        </div>
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
    .decripsionCategory {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid black;
        margin: 10px;
    }
    
    .decripsionCategory #pic img {
        width: 400px;
    }
    
    .decripsionCategory #scripsion p {
        padding: 10px;
    }
    
    .listBook {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
    }
    
    .detailBook {
        width: 300px;
        margin: 10px;
        cursor: pointer;
    }
    
    .detailBook:hover {
        border-bottom: 1px solid gray;
    }
    
    .detailBook #coverBook {
        float: left;
    }
    
    .detailBook #coverBook img {
        width: 130px;
        margin: 10px;
        transition: all 1s ease;
    }
    
    .detailBook #descripsionBook {
        line-height: 50px;
    }
    
    .detailBook #descripsionBook h3 {
        color: rgb(31, 117, 187);
        
    }
    
    .detailBook #descripsionBook p {
        
    }.decripsionCategory {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid black;
    }
    
    .decripsionCategory #pic img {
        width: 400px;
    }
    
    .decripsionCategory #scripsion p {
        padding: 10px;
    }
    
    .listBook {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
    }
    
    .detailBook {
        width: 300px;
        margin: 10px;
        cursor: pointer;
    }
    
    .detailBook:hover {
        border-bottom: 1px solid gray;
    }
    
    .detailBook #coverBook {
        float: left;
    }
    
    .detailBook #coverBook img {
        width: 130px;
        margin: 10px;
        transition: all 1s ease;
    }
    
    .detailBook #descripsionBook {
        line-height: 50px;
    }
    
    .detailBook #descripsionBook h3 {
        color: rgb(31, 117, 187);
        
    }
    
    .detailBook #descripsionBook p {
        
    }.decripsionCategory {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid black;
    }
    
    .decripsionCategory #pic img {
        width: 400px;
    }
    
    .decripsionCategory #scripsion p {
        padding: 10px;
    }
    
    .listBook {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
    }
    
    .detailBook {
        width: 300px;
        margin: 10px;
        cursor: pointer;
    }
    
    .detailBook:hover {
        border-bottom: 1px solid gray;
    }
    
    .detailBook #coverBook {
        float: left;
    }
    
    .detailBook #coverBook img {
        width: 130px;
        margin: 10px;
        transition: all 1s ease;
    }
    
    .detailBook #descripsionBook {
        line-height: 50px;
    }
    
    .detailBook #descripsionBook h3 {
        color: rgb(31, 117, 187);
        
    }
    
    .detailBook #descripsionBook p {
        
    }
    
    .footer {
        width: 100%;
        height: 350px;
        background-color: rgb(231, 231, 231);
        text-align: center;
        display: flex;
        justify-content: space-around;
    }
    
    .footer div {
        margin: 20px 0 0 0;
    }
    
    .footer div a {
        display: block;
        margin: 10px;
    }
    
    .footer div h3 {
        margin: 10px;
    }

    .left_content {
        width: 70%;
        float: left;
    }
    
    @media only screen and (max-width: 600px) {
        body {
            margin: 0;
            position: relative;
        }
        .detailBook {
            width: 100%;
            margin: 10px;
        }
        .detailBook #coverBook img {
            width: 150px;
            margin: 10px;
        }
        .footer {
            height: fit-content;
        }
        .footer div {
            width: 100%;
        }
        .left_content {
            width: 100%;
        }
        .detailBook #descripsionBook a {
            position: relative;
            display: inline-block;
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
      data : null,
      description: '',
      image: '',
      imageDoc: '',
    }
  },
  async mounted() {
    let data = await axios.get(
      "http://localhost:8080/api/get-doc-by-category?id=" + this.$route.query.cate
    );
    this.data = data.data.info;
    this.data.description = data.data.info[0].description;
    this.data.image = data.data.info[0].imageCategory;
    this.data.imageDoc = data.data.info[0].categoryData.imageDocument;
    //this.ListBook = data.listDocs;
    this.dataReady = true;
    console.log(this.data);
    console.log('image doc: ', this.data.imageDoc);
  },
  async created() {
    
  },
  methods:{
    GoToDetail(id){
        this.$router.push({
            path: '../detail', 
            query: { id: id }
        });
    }
  }
}
</script>