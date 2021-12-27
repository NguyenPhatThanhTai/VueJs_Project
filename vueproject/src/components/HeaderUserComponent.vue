<template>
        <header>
            <img src="https://i.pinimg.com/originals/04/5c/70/045c70e3dcdb99ec3fa50aebb6cc3668.jpg">
            <div class="headerNavigation">
                <ul>
                    <li><router-link to="/">Trang chủ</router-link></li>
                    <li><router-link to="/detail">Thư viện sách</router-link></li>
                    <li><a href="#contact">Thể loại</a></li>
                    <li><a href="#about">Review sách</a></li>
                    <li><a href="#about">Tác giả</a></li>
                    <li><a href="#about">Liên hệ</a></li>
                </ul>
            </div>
        </header>
</template>

<style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }
        
        body {
            margin: 0 200px 0 200px;
            position: relative;
            background-color: gray;
        }
        
        header {
            position: absolute;
        }
        
        header img {
            width: 100%;
        }
        
        .headerNavigation {
            text-align: center;
            background-color: rgb(46, 46, 46);
            position: absolute;
            top: 153px;
            width: 100%;
        }
        
        .headerNavigation ul {
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-around;
            border-bottom: 5px solid rgb(53, 147, 224);
        }
        
        .headerNavigation ul li {
            padding: 10px;
        }
        
        .headerNavigation ul li:hover {
            background-color: rgb(78, 78, 78);
        }
        
        .headerNavigation ul li a {
            padding: 10px;
            color: #fff;
            text-decoration: none;
        }
        
        .active {
            border-bottom: 5px solid rgb(236, 56, 56);
        }
        
        main {
            position: absolute;
            margin-top: 200px;
            background-color: #fff;
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
            main {
                position: absolute;
                margin-top: 200px;
                background-color: #fff;
            }
            .headerNavigation {
                top: 107px;
            }
            .footer {
                height: fit-content;
            }
            .footer div {
                width: 100%;
            }
        }
</style>