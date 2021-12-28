<template>
    <div id="detail" class="UserContain">
      <HeaderUser/>
        <main id="UserMain">
        <div class="left_content">
            <div class="book">
              <div class="detailBook">
                  <div id="coverBook">
                      <img src="https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia11.jpg">
                  </div>
                  <div id="descripsionBook">
                      <h1>{{bookId}}</h1>
                      <p>- Xuất bản năm 2000</p>
                      <p>- Của Diệp Quang Đức</p>
                      <a v-on:click="GoToRead(bookId)">Bắt đầu đọc</a>
                  </div>
              </div>
              <div class="scriptAboutBook">
                  <h3><b>- Lời nói đầu</b></h3>
                  <p>Đắc nhân tâm (được lòng người), tên tiếng Anh là How to Win Friends and Influence People là một quyển sách nhằm tự giúp bản thân (self-help) bán chạy nhất từ trước đến nay. Quyển sách này do Dale Carnegie viết và đã được xuất bản lần đầu
                      vào năm 1936, nó đã được bán 15 triệu bản trên khắp thế giới.[1][2] Nó cũng là quyển sách bán chạy nhất của New York Times trong 10 năm. Tác phẩm được đánh giá là cuốn sách đầu tiên và hay nhất trong thể loại này, có ảnh hưởng thay
                      đổi cuộc đời đối với hàng triệu người trên thế giớ... <a href="#" style="text-decoration: none; color: rgb(26, 141, 187);">Đọc tiếp</a></p>
              </div>
          </div>
        </div>
        <RightNavigation/>
        <FooterUser/>
        </main>
    </div>
</template>

<style>
    .detailBook {
        margin: 50px 10px 50px 10px;
        display: flex;
        justify-content: center;
    } 
    
    .detailBook #coverBook img {
        width: 300px;
    }
    
    .detailBook #descripsionBook {
        padding: 10px 10px 10px 30px;
        line-height: 50px;
        position: relative;
    }
    
    .detailBook #descripsionBook h1 {
        color: rgb(15, 124, 214);
    }
    
    .detailBook #descripsionBook a {
        padding: 5px;
        border-radius: 8px;
        background-color: rgb(85, 163, 236);
        color: #fff;
        width: 100%;
        position: absolute;
        bottom: 10px;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
    }

    .detailBook #descripsionBook a:hover{
        background-color: rgb(49, 141, 226);
    }
    
    .scriptAboutBook {
        width: 100%;
        padding: 10px;
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

export default {
  name: 'Detail',
  components:{
      HeaderUser,
      FooterUser,
      RightNavigation
  },
  data: function(){
    return {
      bookId : ''
    }
  },
  async created() {
    this.bookId = this.$route.query.book
  },
  methods:{
    GoToRead(id){
        this.$router.push({
            path: 'read', 
            query: { book: id }
        });
    }
  }
}
</script>