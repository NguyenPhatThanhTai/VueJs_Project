<template>
    <div class="container">
        <form class="form-login" v-on:submit.prevent="login" method="post">
            <h1>Đăng Nhập Admin</h1>
            <div class="form-text">
                <input type="text" name="username" placeholder="Tài khoản">
            </div>
            <div class="form-text">
                <input type="password" name="password" placeholder="Mật khẩu">
            </div>
            <button>Đăng Nhập</button>
        </form>
    </div>
</template>

<style>
    :root {
    --bg1 :#4cb373;
    --bg2 :#4d34db;
    --text :#8738c8;
}

* {
    margin: 0;
    padding: 0;
    outline: none;
}

a {
    text-decoration: none;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom right,var(--bg1),var(--bg2));
}

.form-login {
    width: 400px;
    height: 350px;
    background: #fff;
    border-radius: 10px;
    padding: 40px 30px;
}

.form-login h1 {
    margin-bottom: 40px;
}

.form-login button {
    height: 35px;
    width: 100%;
    margin-bottom: 30px;
    background: linear-gradient(to bottom right,var(--bg1),var(--bg2),var(--bg1));
    border: none;
    color: #fff;
    border-radius: 5px;
    background-size: 200%;
    transition: 0.5s;
}

.form-login button:hover {
    background-position: right;
}

.form-text {
    margin-bottom: 40px;
    position: relative;
}

.form-text input {
    width: 100%;
    height: 35px;
    border: none;
    border-bottom: 2px solid #ccc;
    cursor: pointer;
    padding-left: 12px;
}

.form-text label {
    position: absolute;
    left: 12px;
    bottom: 12px;
    transition: 0.5s;
}

.form-text label.focus {
    transform: translateY(-45px);
}

</style>

<script>
import axios from "axios";
import VueSession from 'vue-session';
import Vue from 'vue';
Vue.use(VueSession)


export default {
    name: 'Login',
    components: {

    },
    data: function () {
        return {
            data : {
                username : '',
                password : ''
            }
        }
    },
    async mounted() {
        // this.getData();
    },
    async created() {
        
    },
    methods: {
        async login(e) {
            var username = e.target.elements.username.value;
            var password = e.target.elements.password.value;

            let response = await axios.post('http://localhost:8080/api/login-admin', {
                username : username,
                password : password
            });
            
            console.log(response);

            if(response.data.info.errMessage == "Ok"){
                this.$session.start()
                this.$session.set('admin', response.data.info.roleAdmin);
                
                this.$session.set('user', response.data.info.roleAdmin);

                this.$router.push('/Adm/BookManagment');
            }else{
                alert("Không phải tài khoản admin !");
            }
        }
    }
}
</script>