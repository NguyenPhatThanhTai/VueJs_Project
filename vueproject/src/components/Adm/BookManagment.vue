<template>
<div id="BookManagment">
    <input type="checkbox" id="nav-toggle">
    <SidebarAdm/>
    <div class="main-content">
        <HeaderAdm/>
        <main id="AdmMain">
            <div class="tittle">
                <h3>Quản lý sách</h3>
            </div>

            <div class="inputContain">
                <form v-on:submit.prevent="addBook">
                    <div class="leftInput">
                        <input type="text" name="BookName" placeholder="Tên sách mới" required>
                        <input type="text" name="BookCover" placeholder="URL ảnh bìa sách" required>
                        <ckeditor v-model="bookContent" :config="editorConfig"></ckeditor>
                            <select required id="AUT" name="BookAuthor">
                                <option disabled selected>--Chọn tác giả--</option>
                                <option value="TG1">Tác giả 1</option>
                                <option value="TG2">Tác giả 2</option>
                                <option value="TG3">Tác giả 3</option>
                            </select>
                            <select required id="NXB" name="BookPublisher">
                                <option disabled selected>--Chọn nhà xuất bản--</option>
                                <option value="NXB1">Nhà xuất bản 1</option>
                                <option value="NXB2">Nhà xuất bản 2</option>
                                <option value="NXB3">Nhà xuất bản 3</option>
                            </select>
                            <select required id="CD" name="BookTopic">
                                <option disabled selected>--Chọn chủ đề--</option>
                                <option value="CD1">Chủ đề 1</option>
                                <option value="CD2">Chủ đề 2</option>
                                <option value="CD3">Chủ đề 3</option>
                            </select>
                    </div>
                    <input class="submit" type="submit" value="Thêm sách">
                </form>
                <div style="clear: both;"></div>
                <button v-on:click="changeListData">Đổi</button>
                <div class="listCourse">
                    <table>
                        <tr>
                            <th>Mã sách</th>
                            <th>Tiêu đề sách</th>
                            <th>Nội dung</th>
                            <th>Số trang</th>
                            <th>Nhà xuất bản</th>
                            <th>Hành động</th>
                        </tr>
                        <tr v-for="book in ListBook" v-bind:key="book.BookId" v-bind:detail="book">
                            <td>{{book.BookId}}</td>
                            <td>{{book.Name}}</td>
                            <td>{{book.Publisher}}</td>
                            <td>{{book.Author}}</td>
                            <td>{{book.Topic}}</td>
                            <td>
                                <p id="detail" class="clickUpdate">Sửa</p>
                                <p id="delete">Xóa</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <!-- The Modal -->
            <div id="myModal" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h2>Cập nhật sách</h2>
                    </div>
                    <div class="modal-body">
                        <form method="post">
                            <div class="leftInput">
                                <input type="text" name="BookNameUpdate" placeholder="Tên sách mới" required>
                                <input type="text" name="BookCoverUpdate" placeholder="URL ảnh bìa sách" required>
                                <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
                                <select required id="AUT" name="BookAuthorUpdate">
                                    <option disabled selected>--Chọn tác giả--</option>
                                    <option value="TG1">Tác giả 1</option>
                                    <option value="TG2">Tác giả 2</option>
                                    <option value="TG3">Tác giả 3</option>
                                </select>
                                <select required id="NXB" name="BookPublisherUpdate">
                                    <option disabled selected>--Chọn nhà xuất bản--</option>
                                    <option value="NXB1">Nhà xuất bản 1</option>
                                    <option value="NXB2">Nhà xuất bản 2</option>
                                    <option value="NXB3">Nhà xuất bản 3</option>
                                </select>
                                <select required id="CD" name="BookTopicUpdate">
                                    <option disabled selected>--Chọn chủ đề--</option>
                                    <option value="CD1">Chủ đề 1</option>
                                    <option value="CD2">Chủ đề 2</option>
                                    <option value="CD3">Chủ đề 3</option>
                                </select>
                            </div>
                            <input class="submit" type="submit" value="Thêm sách">
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
</template>
<script>
    import Vue from 'vue'
    import HeaderAdm from './HeaderAdmComponent.vue'
    import SidebarAdm from './SidebarAdmComponent.vue'
    import axios from 'axios'
    import CKEditor from 'ckeditor4-vue';
    Vue.use(CKEditor)

    export default {
    name: 'BookManagment',
    components:{
      HeaderAdm,
      SidebarAdm,
    },
    data: function(){
        return{
            data: null,
            dataReady : false,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            //list book
            ListBook :[{
                BookId : "BOOK1",
                Name : "Hàn vạn câu hỏi tại sao 1",
                Publisher : "Tuổi trẻ",
                Author : "Nguyễn Du",
                Topic : "Cuộc sống"
            },
            {
                BookId : "BOOK2",
                Name : "Hàn vạn câu hỏi tại sao 2",
                Publisher : "Tuổi trẻ",
                Author : "Nguyễn Du",
                Topic : "Cuộc sống"
            },
            {
                BookId : "BOOK2",
                Name : "Hàn vạn câu hỏi tại sao 3",
                Publisher : "Tuổi trẻ",
                Author : "Nguyễn Du",
                Topic : "Cuộc sống"
            }],
            //form add book
            BookName: '',
            BookCover: '',
            BookPulisher: '',
            BookTopic: '',
            BookAuthor: '',
            bookContent: '',
        }
    },
    async mounted(){
        let data = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        this.data = data.data.time.updated;
        this.dataReady = true;
        this.loadEditor();
    },
    async created(){
        this.loadEditor();
    },
    methods:{
        loadEditor(){
            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the button that opens the modal
            var btn = document.getElementsByClassName("clickUpdate")[0];

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks the button, open the modal 
            btn.onclick = function() {
                modal.style.display = "block";
            }

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        },

        addBook(e){
            this.BookName = e.target.elements.BookName.value;
            this.BookCover = e.target.elements.BookCover.value;
            this.BookPulisher = e.target.elements.BookPublisher.value;
            this.BookTopic = e.target.elements.BookTopic.value;
            this.BookAuthor = e.target.elements.BookAuthor.value;

            console.log(this.BookName + "|" + this.BookCover + "|" + this.BookPulisher + "|" + this.BookTopic + "|" + this.bookContent + "|" + this.BookAuthor);
        },

        changeListData(){
            this.ListBook = [{
                BookId : "BOOK6",
                Name : "Hàn vạn câu hỏi tại sao 3",
                Publisher : "Tuổi trẻ",
                Author : "Nguyễn Du",
                Topic : "Cuộc sống"
            }]
        }
    }
}
</script>

    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
:root {
    --main-color: #DD2F6E;
    --color-dark: #1D2231;
    --text-grey: #8390A2;
}

#cke_editor1{
    margin:  10px;
    width: 100%;
}

#cke_editor2{
    margin:  10px;
    width: 100%;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
}

#nav-toggle:checked~.main-content {
    margin-left: 70px;
}

.main-content {
    transition: margin-left 300ms;
    margin-left: 345px;
}

#nav-toggle {
    display: none;
}

.search-wrapper {
    border: 1px solid #ccc;
    border-radius: 30px;
    height: 50px;
    display: flex;
    align-items: center;
    overflow-x: hidden;
}

.search-wrapper span {
    display: inline-block;
    padding: 0rem 1rem;
    font-size: 1.5rem;
}

.search-wrapper input {
    height: 100%;
    padding: .5rem;
    border: none;
    outline: none;
}

.user-wrapper {
    display: flex;
    align-items: center;
}

.user-wrapper img {
    border-radius: 50%;
    margin-right: 1rem;
}

.user-wrapper small {
    display: inline-block;
    color: var(--text-grey);
}

#AdmMain {
    margin: 85px 0px 0px 0px;
    padding: 10px;
    background: #f1f5f9;
    min-height: calc(100vh - 90px);
}

.tittle {
    text-align: center;
    font-size: 30px;
    color: rgb(156, 156, 156);
    border-bottom: 1px solid gray;
}

.custom-select {
    position: relative;
    font-family: Arial;
}

.custom-select select {
    display: none;
    /*hide original SELECT element:*/
}

.select-selected {
    background-color: DodgerBlue;
}


/*style the arrow inside the select element:*/

.select-selected:after {
    position: absolute;
    content: "";
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
}


/*point the arrow upwards when the select box is open (active):*/

.select-selected.select-arrow-active:after {
    border-color: transparent transparent #fff transparent;
    top: 7px;
}


/*style the items (options), including the selected item:*/

.select-items div,
.select-selected {
    color: #ffffff;
    padding: 8px 16px;
    border: 1px solid transparent;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
    cursor: pointer;
    user-select: none;
}


/*style items (options):*/

.select-items {
    position: absolute;
    background-color: DodgerBlue;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 99;
}


/*hide the items when the select box is closed:*/

.select-hide {
    display: none;
}

.select-items div:hover,
.same-as-selected {
    background-color: rgba(0, 0, 0, 0.1);
}

.leftInput {
    width: 98%;
    margin: 10px;
    float: left;
}

.rightInput {
    float: right;
    width: 45%;
    margin: 10px;
    text-align: center;
}

.rightInput img {
    width: 170px;
    border-radius: 100%;
}

.rightInput label {
    display: block;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    background-color: blue;
    color: #fff;
    cursor: pointer;
    font-size: 13px;
}

.leftInput input {
    display: block;
    width: 100%;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: none;
}

.leftInput textarea {
    display: block;
    width: 100%;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    resize: none;
}

.leftInput input:focus {
    outline: none;
}

.leftInput textarea:focus {
    outline: none;
}

.submit {
    background-color: #e64b84;
    color: #fff;
    cursor: pointer;
    display: block;
    width: 100%;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: none;
}

.submit:hover {
    background-color: #DD2F6E;
}

.listCourse {
    margin: 10px;
    overflow: auto;
}

.listCourse table {
    width: 100%;
    text-align: center;
}

.listCourse th,
td {
    border-bottom: 1px solid rgb(197, 197, 197);
    padding: 10px;
    min-width: 100px;
}

.listCourse td p {
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
}

.listCourse td #detail {
    background-color: rgb(111, 188, 190);
}

.listCourse td #delete {
    background-color: rgb(221, 55, 55);
}


/* The Modal (background) */

.modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 100;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
    -webkit-animation-name: fadeIn;
    /* Fade in the background */
    -webkit-animation-duration: 0.4s;
    animation-name: fadeIn;
    animation-duration: 0.4s
}


/* Modal Content */

.modal-content {
    position: fixed;
    bottom: 0;
    background-color: #f1f5f9;
    width: 100%;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s;
    transition: left 300ms;
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

.modal-header {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
}

.modal-body {
    padding: 2px 16px;
    margin: 20px;
    height: 500px;
    overflow-y: scroll;
}

.modal-footer {
    padding: 2px 16px;
    background-color: #5cb85c;
    color: white;
}


/* Add Animation */

@-webkit-keyframes slideIn {
    from {
        bottom: -300px;
        opacity: 0
    }
    to {
        bottom: 0;
        opacity: 1
    }
}

@keyframes slideIn {
    from {
        bottom: -300px;
        opacity: 0
    }
    to {
        bottom: 0;
        opacity: 1
    }
}

@-webkit-keyframes fadeIn {
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
}

@keyframes fadeIn {
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
}

.leftInput #cke_editor {
    margin: 10px;
    width: 100%;
}

.leftInput #cke_editorUpdate {
    margin: 10px;
    width: 100%;
}

.leftInput select {
    margin: 10px;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 8px;
}

.leftInput select:focus {
    outline: none;
}

@media only screen and (max-width: 1200px) {
    .main-content {
        margin-left: 70px;
    }
}

@media only screen and (max-width: 960px) {}

@media only screen and (max-width: 768px) {
    .search-wrapper {
        display: none;
    }
    #nav-toggle:checked~.main-content {
        margin-left: 0rem !important;
    }
    .leftInput {
        width: 100%;
        float: none;
        margin: 0;
    }
    .leftInput input {
        margin: 10px 0 10px 0;
    }
    .leftInput textarea {
        margin: 10px 0 10px 0;
    }
    .rightInput {
        width: 100%;
        float: none;
        margin: 0;
    }
}

@media only screen and (max-width: 560px) {}
        .alert {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            animation: showAlert 1s;
        }
        
        .content_alert {
            position: absolute;
            top: 0;
            background-color: rgb(243, 94, 94);
            color: #fff;
            width: 100%;
            line-height: 50px;
            border-radius: 5px;
            text-align: center;
        }
        
        .btn_close {
            position: absolute;
            right: 0;
            cursor: pointer;
        }
        
        .btn_close .bx-x {
            margin: 10px;
            font-size: 30px;
        }
        
        @keyframes showAlert {
            from {
                top: -50px;
            }
            to {
                top: 0;
            }
        }
    </style>