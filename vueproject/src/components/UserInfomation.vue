<template>
    <div id="detail" class="UserContain">
      <HeaderUser/>
        <main id="UserMain">
        <div class="left_content">
            <div class="user">
                <div id="welcome">
                    <h3>Xin chào, {{user.firstName + ' ' + user.lastName}}</h3>
                    <img v-bind:src="'' + user.imageUser" />
                </div>
                <div id="userDetail">
                    <div>
                        <b>Email: </b><span>{{user.email}}</span>
                    </div>
                    <div>
                        <b>Địa chỉ: </b><span>{{user.address}}</span>
                    </div>
                    <div>
                        <b>Tên đăng nhập: </b><span>{{user.username}}</span>
                    </div>
                    <div>
                        <b>Mật khẩu: </b><span>******</span>
                    </div>
                </div>
                <div id="chanceUser">
                    <button v-on:click="OpenPopupForChanceUser">Thay đổi thông tin</button>
                </div>
            </div>
            <div class="UserSavedBook">
                <div class="listBook">
                    <div class="detailBook"
                        v-for="savedBook in savedDoc"
                        v-bind:key="savedBook.id"
                        v-bind:detail="savedBook"
                        v-on:click="GoToDetail(savedBook.documentId)"
                    >
                        <div id="coverBook">
                            <img v-bind:src="'' + savedBook.documentData.imageDocument" />
                        </div>
                        
                        <div id="descripsionBook">
                            
                            <h3>{{savedBook.documentData.nameDocument}}</h3>
                            <p>Số trang: {{savedBook.documentData.pageNumber}}</p>
                            <p>Tác giả: {{savedBook.documentData.authorData.nameAuthor}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="myModal" class="UpdateUser" v-if="openPopup">
                <div class="UpdateUser-content">
                    <div class="UpdateUser-header">
                        <span class="close" v-on:click="ClosePopupForChanceUser ">&times;</span>
                        <h2>Thay đổi thông tin người dùng</h2>
                    </div>
                    <div class="UpdateUser-body">
                        <form v-on:submit.prevent="editinfo" method="post">
                            <input type="email" name="email" placeholder="Email" v-model="user.email">
                            <input type="text" name="lastName" placeholder="Họ" v-model="user.lastName">
                            <input type="text" name="firstName" placeholder="Tên đệm và tên" v-model="user.firstName">
                            <input type="text" name="username" placeholder="Tên đăng nhập" disabled v-model="user.username">
                            <input type="text" name="address" placeholder="Địa chỉ" v-model="user.address">
                            <input type="text" name="imageUser" placeholder="Ảnh đại diện" v-model="user.imageUser">
                            <input type="password" name="password" placeholder="Mật khẩu mới" >
                            <input type="submit" value="Thay đổi">
                        </form>
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
    .user {
        margin: 10px;
    }
    
    .user #welcome {
        text-align: center;
    }
    
    .user #welcome h3 {
        text-align: center;
    }
    
    .user #welcome img {
        width: 30%;
        border-radius: 100%;
        margin: 10px;
    }
    
    .user #userDetail {
        line-height: 50px;
    }
    
    .user #chanceUser {
        text-align: center;
    }
    
    .user #chanceUser button {
        width: 50%;
        padding: 10px;
        margin: 10px;
        background-color: rgb(88, 173, 230);
        color: #fff;
        border: none;
        border-radius: 10px;
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
    
    .UpdateUser {
        display: block;
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }
    
    .UpdateUser-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s
    }
    /* Add Animation */
    
    @-webkit-keyframes animatetop {
        from {
            top: -300px;
            opacity: 0
        }
        to {
            top: 0;
            opacity: 1
        }
    }
    
    @keyframes animatetop {
        from {
            top: -300px;
            opacity: 0
        }
        to {
            top: 0;
            opacity: 1
        }
    }
    /* The Close Button */
    
    .close {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    
    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
    
    .UpdateUser-header {
        padding: 2px 16px;
        background-color: rgb(84, 161, 224);
        color: white;
    }
    
    .UpdateUser-body {
        padding: 2px 16px;
    }
    
    .UpdateUser-body form input {
        display: block;
        width: 100%;
        padding: 10px;
        border: none;
        background-color: rgb(240, 240, 240);
        border-radius: 10px;
        margin: 10px;
    }
    
    .UpdateUser-body form input[type=submit] {
        background-color: rgb(84, 161, 224);
        color: #fff;
    }
    
    .moUpdateUserdal-body form input:focus {
        outline: none;
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
import axios from 'axios';

export default {
  name: 'Detail',
  components:{
      HeaderUser,
      FooterUser,
      RightNavigation
  },
  data: function(){
    return {
      openPopup : false,
      user : null,
      savedDoc: null,
    }
  },
  async mounted(){
        if(this.$session.get('user') == null){
            this.$router.push('/login')
        }

        let idUser = this.$session.get('user');
        let userInfo = await axios.get('http://localhost:8080/api/get-info-user?id=' + idUser.id);
        
        this.user = userInfo.data.user;
        
        let savedDocInfo = await axios.get('http://localhost:8080/api/get-all-saved-document?id=' + idUser.id);

        this.savedDoc = savedDocInfo.data.message;
        console.log('savedDoc', this.savedDoc);
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
    },
    GoToDetail(id){
        this.$router.push({
            path: 'detail', 
            query: { id: id }
        });
    },
    OpenPopupForChanceUser(){
        this.openPopup = true;
    },
    ClosePopupForChanceUser(){
        this.openPopup = false;
    },
    async editinfo(e){
            var id = this.$session.get('user').id;
            var password = e.target.elements.password.value;
            var email = e.target.elements.email.value;
            var firstName = e.target.elements.firstName.value;
            var lastName = e.target.elements.lastName.value;
            var address = e.target.elements.address.value;
            var imageUser = e.target.elements.imageUser.value;

            let response = await axios.put('http://localhost:8080/api/edit-a-user', {
                id: id,
                email: email,
                firstName: firstName,
                lastName: lastName,
                address: address,
                imageUser: imageUser,
                password : password,
            });
            
            console.log(response);

            if(response.data.message == "Updated user!"){
                alert("Đã cập nhật thông tin !");
                this.openPopup = false;

                let userInfo = await axios.get('http://localhost:8080/api/get-info-user?id=' + id);
        
                this.user = userInfo.data.user;
            }else{
                alert("Vui lòng kiểm tra lại thông tin");
            }
    }
  }
}
</script>