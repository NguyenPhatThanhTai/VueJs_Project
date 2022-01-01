<template>
    <div id="detail" class="UserContain">
      <HeaderUser/>
        <main id="UserMain">
        <div class="left_content">
            <div id="authorDetail">
                <div id="portrait">
                    <img v-bind:src="'' + infoAuthor.imageAuthor" /> 
                </div>
                <div id="scripsion">
                    <h3>{{infoAuthor.nameAuthor}}</h3>
                    <p>{{infoAuthor.description}}</p>
                </div>
            </div>
            <div class="bookOfCategory">
                <div class="listBook">
                    <div class="detailBook"
                        v-for="author in data"
                        v-bind:key="author.id"
                        v-on:click="GoToDetail(author.authorData.id)"
                    >
                        <div id="coverBook">
                            <img v-bind:src="'' + author.authorData.imageDocument" /> 
                        </div>
                        <div id="descripsionBook">
                            <h3>{{author.authorData.id}}</h3>
                            <p>{{author.authorData.nameDocument}}</p>
                            <p>{{author.authorData.publisherData.namePublisher}}</p>
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
    #authorDetail {
        display: flex;
        margin: 10px;
        border-bottom: 1px solid black;
    }
    
    #authorDetail #portrait img {
        width: 300px;
        padding: 10px 10px 10px 0;
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

    .decripsionCategory {
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

    .decripsionCategory {
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
        #authorDetail {
            display: block;
            margin: 10px 10px 10px 0;
        }
        #authorDetail #portrait img {
            width: 100%;
            padding: 10px 10px 10px 0;
            margin: 10px;
        }
        #authorDetail #scripsion {
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
      data : null,
      infoAuthor : null,
    }
  },
  async mounted() {
    let data = await axios.get(
      "http://localhost:8080/api/get-doc-by-author?id=" + this.$route.query.author
    );

    let infoAuthor = await axios.get(
      "http://localhost:8080/api/get-info-author?id=" + this.$route.query.author
    );

    this.data = data.data.info;

    this.infoAuthor = infoAuthor.data.info;
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