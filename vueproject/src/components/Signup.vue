<template>
    <div class="container">
        <form class="form-signup" v-on:submit.prevent="signup" method="post">
            <h1>Đăng Ký</h1>
            <div class="form-text">
                <input type="email" name="email" placeholder="Địa chỉ Email">
            </div>
            <div class="form-text">
                <input type="text" name="username" placeholder="Tên đăng nhập">
            </div>
            <div class="form-text">
                <input type="password" name="password" placeholder="Mật khẩu">
            </div>
            <div class="form-text">
                <input type="text" name="firstName" placeholder="Tên đệm và Tên">
            </div>
            <div class="form-text">
                <input type="text" name="lastName" placeholder="Họ">
            </div>
            <div class="form-text">
                <input type="text" name="address" placeholder="Địa chỉ">
            </div>
            <button>Đăng Ký</button>
        </form>
    </div>
</template>

<style>
    :root {
    --bg1 :#9b59b6;
    --bg2 :#3498db;
    --text :#26ade4;
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

.form-signup {
    width: 300px;
    height: 570px;
    background: #fff;
    border-radius: 10px;
    padding: 40px 30px;
}

.form-signup h1 {
    margin-bottom: 40px;
}

.form-signup button {
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

.form-signup button:hover {
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
    name: 'Signup',
    components: {

    },
    data: function () {
        return {
            data : {
                username : '',
                password : '',
                email: '',
                firstName: '',
                lastName: '',
                address: '',
            }
        }
    },
    async mounted() {
        // this.getData();
    },
    async created() {
        
    },
    methods: {
        async signup(e) {
            var username = e.target.elements.username.value;
            var password = e.target.elements.password.value;
            var email = e.target.elements.email.value;
            var firstName = e.target.elements.firstName.value;
            var lastName = e.target.elements.lastName.value;
            var address = e.target.elements.address.value;

            let response = await axios.post('http://localhost:8080/api/signup', {
                username : username,
                password : password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                address: address,
            });
            
            console.log(response);

            let user = {
                username : username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                address: address,
            };

            if(response.data.message.message == "Ok"){
                this.$session.start()
                this.$session.set('user', user);

                this.$router.push('/');
            }else{
                alert("Vui lòng kiểm tra lại thông tin");
            }
        }
    }
}
</script>