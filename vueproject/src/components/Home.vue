<template>
<div id="home" class="UserContain">
    <HeaderUser/>
    <main id="UserMain">
        <div class="left_content">
            <div class="search">
                <div id="searchBox">
                    <input type="text" placeholder="Tìm kiếm sách..."><i class="fas fa-search"></i>
                </div>
            </div>
            <div class="listBook" >
                <div class="detailBooks" v-for="book in ListBook" v-bind:key="book.id" v-bind:detail="book" v-on:click="GoToDetail(book.id)">
                    <div id="coverBook">
                        <img src="https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia11.jpg">
                    </div>
                    <div id="descripsionBook">
                        <h3>{{book.tittle}}</h3>
                        <p>- Xuất bản năm 2000</p>
                        <p>- Của Diệp Vấn</p>
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
        .search {
            display: flex;
            align-items: left;
            justify-content: left;
            margin: 20px 20px 20px 50px;
        }
        
        .search #searchBox {
            text-align: left;
            position: relative;
            width: fit-content;
        }
        
        .search input {
            padding: 10px;
            border-radius: 15px;
            font-size: 15px;
            border: 1px solid gray;
            width: 300px;
        }
        
        .search i {
            position: absolute;
            line-height: 50px;
            right: 20px;
            color: gray;
        }   
        
        .listBook {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-around;
        }
        
        .detailBooks {
            width: 300px;
            margin: 10px;
            cursor: pointer;
        }

        .detailBooks:hover {
            border-bottom: 1px solid gray;
        }
        
        .detailBooks #coverBook {
            float: left;
        }
        
        .detailBooks #coverBook img {
            width: 130px;
            margin: 10px;
            transition: all 1s ease;
        }
        
        .detailBooks #descripsionBook {
            line-height: 50px;
        }
        
        .detailBooks #descripsionBook h3 {
            color: rgb(31, 117, 187);
            overflow: hidden;   
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            /* number of lines to show */
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        
                
        .detailBook #descripsionBook p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            /* number of lines to show */
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .left_content {
            width: 70%;
            float: left;
        }
        
        @media only screen and (max-width: 600px) {
            .detailBooks {
                width: 100%;
                margin: 10px;
            }
            .detailBooks #coverBook img {
                width: 150px;
                margin: 10px;
            }
            .left_content {
                width: 100%;
            }
        }
</style>

<script>
import HeaderUser from './HeaderUserComponent.vue'
import FooterUser from './FooterUserComponent.vue'
import RightNavigation from './RightNavigation.vue'

export default {
  name: 'home',
    components:{
      HeaderUser,
      FooterUser,
      RightNavigation
  },
    data:function() {
        return {
            ListBook: [{
                id: 1,
                tittle: 'Mười vạn câu hỏi tại sao',
                url: 'Https://google.com'
            }, {
                id: 2,
                tittle: 'Mười vạn câu hỏi tại sao',
                url: 'Https://google.com'
            }, {
                id: 3,
                tittle: 'Mười vạn câu hỏi tại sao',
                url: 'Https://google.com'
            }, {
                id: 4,
                tittle: 'Mười vạn câu hỏi tại sao',
                url: 'Https://google.com'
            }, {
                id: 5,
                tittle: 'Mười vạn câu hỏi tại sao',
                url: 'Https://google.com'
            }, {
                id: 5,
                tittle: 'Mười vạn câu hỏi tại sao',
                url: 'Https://google.com'
            }]
        }
    },
    async created() {
        console.log(new URL(location.href).searchParams.get('page'));
    },
    methods:{
        GoToDetail(id){
            this.$router.push({
                path: 'detail', 
                query: { book: id }
            });
        }
    }
}
</script>