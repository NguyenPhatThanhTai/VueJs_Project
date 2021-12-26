<template>
<div id="home">
    <HeaderUser/>
    <main>
        <div class="headerNavigation">
            <ul>
                <li><a class="active" href="#home">Trang chủ</a></li>
                <li><router-link to="/detail">Thư viện sách</router-link></li>
                <li><a href="#contact">Thể loại</a></li>
                <li><a href="#about">Review sách</a></li>
                <li><a href="#about">Tác giả</a></li>
                <li><a href="#about">Liên hệ</a></li>
            </ul>
        </div>
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
        <FooterUser/>
    </main>
</div>
</template>

<style>
        .search {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px;
        }
        
        .search #searchBox {
            text-align: center;
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
            width: 400px;
            margin: 10px;
        }
        
        .detailBooks #coverBook {
            float: left;
        }
        
        .detailBooks #coverBook img {
            width: 170px;
            margin: 10px;
        }
        
        .detailBooks #descripsionBook {
            line-height: 50px;
        }
        
        .detailBooks #descripsionBook h3 {
            color: rgb(31, 117, 187);
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
        }
</style>

<script>
import HeaderUser from './HeaderUserComponent.vue'
import FooterUser from './FooterUserComponent.vue'
export default {
  name: 'home',
    components:{
      HeaderUser,
      FooterUser
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
    created() {
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