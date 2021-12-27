<template>
    <div class="right_content">
        <div class="box_content">
            <div id="header">
                <h3>Sách mới ra mắt</h3>
            </div>
            <div id="content">
                <ul>
                    <li>
                        <a href="#">Sách mới ra mắt 1</a>
                    </li>
                    <li>
                        <a href="#">Sách mới ra mắt 1</a>
                    </li>
                    <li>
                        <a href="#">Sách mới ra mắt 1</a>
                    </li>
                    <li>
                        <a href="#">Sách mới ra mắt 1</a>
                    </li>
                    <li>
                        <a href="#">Sách mới ra mắt 1</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="box_content">
            <div id="header">
                <h3>Sách nổi bật</h3>
            </div>
            <div id="content">
                <ul>
                    <li>
                        <a href="#">Sách nổi bật 1</a>
                    </li>
                    <li>
                        <a href="#">Sách nổi bật 1</a>
                    </li>
                    <li>
                        <a href="#">Sách nổi bật 1</a>
                    </li>
                    <li>
                        <a href="#">Sách nổi bật 1</a>
                    </li>
                    <li>
                        <a href="#">Sách nổi bật 1</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style>
    .right_content {
            width: 30%;
            float: right;
        }
        
        .box_content {
            margin: 20px 10px 10px 10px;
        }
        
        .box_content #header {
            text-align: center;
            background-color: rgb(53, 147, 224);
            color: #fff;
            padding: 10px;
            border-radius: 8px;
        }
        
        .box_content #content {
            padding: 20px;
            line-height: 50px;
        }
        
        .box_content #content ul li a {
            text-decoration: none;
            color: black;
        }
        
        .box_content #content ul li a:hover {
            border-bottom: 1px solid gray;
        }

        @media only screen and (max-width: 600px) {
            .right_content {
                width: 100%;
            }
        }
</style>