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
                <form v-on:submit.prevent="savedBook" method="post">
                    <div class="leftInput">
                        <input type="text" name="BookName" placeholder="Tên sách mới" required>
                        <input type="text" name="BookCover" placeholder="URL ảnh bìa sách" required>
                        <input type="text" name="BookDescription" placeholder="Miêu tả ngắn về sách" required>
                        <ckeditor v-model="bookContent" :config="editorConfig"></ckeditor>
                            <select required id="AUT" name="BookAuthor" v-model="dataAuthor">
                                <option value="null" disabled selected>--Chọn tác giả--</option>
                                <option v-for="au in listAuthor"
                                    v-bind:value="au.id"
                                    v-bind:key="au.id"
                                >{{au.nameAuthor}}</option>
                            </select>
                            <select required id="NXB" name="BookPublisher" v-model="dataPublisher">
                                <option value="null" disabled selected>--Chọn nhà xuất bản--</option>
                                <option v-for="pub in listPublisher" 
                                    v-bind:value="pub.id"
                                    v-bind:key="pub.id"
                                >{{pub.namePublisher}}</option>
                                
                            </select>
                            <select required id="CD" name="BookTopic" v-model="dataCategory">
                                <option value="null" disabled selected>--Chọn chủ đề--</option>
                                <option v-for="cate in listCategory" 
                                    v-bind:value="cate.id"
                                    v-bind:key="cate.id"
                                >{{cate.nameCategory}}</option>
                                
                            </select>
                    </div>
                    <input class="submit" type="submit" value="Thêm sách">
                </form>
                <div style="clear: both;"></div>
                <div class="listCourse">
                    <table>
                        <tr>
                            <th>Mã sách</th>
                            <th>Tiêu đề sách</th>
                            <th>Nội dung</th>
                            <th>Nhà xuất bản</th>
                            <th>Tác giả</th>
                            <th>Thể loại</th>
                            <th>Hành động</th>
                        </tr>
                        <tr v-for="doc in listDoc" v-bind:key="doc.id">
                            <td>{{doc.id}}</td>
                            <td>{{doc.nameDocument}}</td>
                            <td>{{doc.imageDocument}}</td>
                            <td>{{doc.publisherData.namePublisher}}</td>
                            <td>{{doc.authorData.nameAuthor}}</td>
                            <td>{{doc.categoryData.nameCategory}}</td>
                            <td>
                                <p id="detail" class="clickUpdate" v-on:click="OpenPopupForChanceUser(doc.id)">Sửa</p>
                                <p id="delete" v-on:click="deleteDoc(doc.id)">Xóa</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <!-- The Modal -->
            <div id="myModal" class="modal" v-if="openPopup">
                <!-- Modal content -->
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close" v-on:click="ClosePopupForChanceUser">&times;</span>
                        <h2>Cập nhật sách</h2>
                    </div>
                    <div class="modal-body">
                        <form v-on:submit.prevent="editDoc" method="post">
                            <div class="leftInput">
                                <input type="text" name="BookNameEdit" placeholder="Tên sách mới" required v-model="docDataEdit.nameDocument">
                                <input type="text" name="BookCoverEdit" placeholder="URL ảnh bìa sách" required v-model="docDataEdit.imageDocument">
                                <input type="text" name="SmallDescriptionEdit" placeholder="Miêu tả ngắn về sách" required v-model="docDataEdit.smallDescription">
                                <ckeditor v-model="bookContentEdit" :config="editorConfig"></ckeditor>
                                <select required id="AUT" name="BookAuthor" v-model="dataAuthorEdit">
                                <option value="null" disabled selected>--Chọn tác giả--</option>
                                <option v-for="au in listAuthor"
                                    v-bind:value="au.id"
                                    v-bind:key="au.id"
                                >{{au.nameAuthor}}</option>
                                </select>
                                <select required id="NXB" name="BookPublisher" v-model="dataPublisherEdit">
                                    <option value="null" disabled selected>--Chọn nhà xuất bản--</option>
                                    <option v-for="pub in listPublisher" 
                                        v-bind:value="pub.id"
                                        v-bind:key="pub.id"
                                    >{{pub.namePublisher}}</option>
                                    
                                </select>
                                <select required id="CD" name="BookTopic" v-model="dataCategoryEdit">
                                    <option value="null" disabled selected>--Chọn chủ đề--</option>
                                    <option v-for="cate in listCategory" 
                                        v-bind:value="cate.id"
                                        v-bind:key="cate.id"
                                    >{{cate.nameCategory}}</option>
                                    
                                </select>
                            </div>
                            <input class="submit" type="submit" value="Sửa sách">
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
            listAuthor: [],
            listPublisher: [],
            listCategory: [],
            listDoc: [],
            dataAuthor: null,
            dataPublisher: null,
            dataCategory: null,
            bookContent: null,
            BookDescription: null,

            openPopup : false,
            docDataEdit: null,
            dataAuthorEdit: null,
            dataPublisherEdit: null,
            dataCategoryEdit: null,
            bookContentEdit: null,
        }
    },
    async mounted(){
        if(this.$session.get('admin') == null){
            this.$router.push('/Adm/loginAdm')
        }

        let listAuthor = await axios.get('http://localhost:8080/api/get-list-author');
        let listPublisher = await axios.get('http://localhost:8080/api/get-list-publisher');
        let listCategory = await axios.get('http://localhost:8080/api/get-list-category');
        let listDoc = await axios.get('http://localhost:8080/api/get-list-documents');

        this.listAuthor = listAuthor.data.info;
        this.listPublisher = listPublisher.data.info;
        this.listCategory = listCategory.data.info;
        this.listDoc = listDoc.data.listDocs;
    },
    async created(){
        
    },
    methods:{
        async OpenPopupForChanceUser(id){
            await this.getDetailToEdit(id);
            this.openPopup = true;
        },
        ClosePopupForChanceUser(){
            this.openPopup = false;
        },
        async savedBook(e) {
            var nameDocument = e.target.elements.BookName.value;
            var smallDescription = e.target.elements.BookDescription.value;
            var imageDocument = e.target.elements.BookCover.value;
            
            let data = await axios.post('http://localhost:8080/api/create-new-document', {
                nameDocument: nameDocument,
                content: this.bookContent,
                smallDescription: smallDescription,
                imageDocument: imageDocument,
                publisherId: this.dataPublisher,
                authorId: this.dataAuthor,
                categoryId: this.dataCategory
            });
            if(data.data.errMessage == "Error from server..."){
                alert("Thêm sách thất bại !");
            }else{
                alert("Thêm sách thành công !");
            }
        },
        async deleteDoc(id){
            let data = await axios.delete('http://localhost:8080/api/delete-document?id=' + id);

            if(data.data.errMessage == "Error from server..."){
                alert("Xóa sách thất bại !");
            }else{
                let listDoc = await axios.get('http://localhost:8080/api/get-list-documents');

                this.listDoc = listDoc.data.listDocs;

                alert("Xóa sách thành công !");
            }
        },
        async getDetailToEdit(id) {
            let data = await axios.get('http://localhost:8080/api/get-detail-document?id=' + id);
            let contentDoc = await axios.get('http://localhost:8080/api/get-document-by-id?id=' + id);

            this.docDataEdit = data.data.info;
            this.openPopup = true;

            this.dataAuthorEdit = this.docDataEdit.authorId;
            this.dataPublisherEdit = this.docDataEdit.publisherId;
            this.dataCategoryEdit = this.docDataEdit.categoryId;
            this.bookContentEdit = contentDoc.data.doc.content;
        },
        async editDoc(e){
            var nameDocument = e.target.elements.BookNameEdit.value;
            var smallDescription = e.target.elements.SmallDescriptionEdit.value;
            var imageDocument = e.target.elements.BookCoverEdit.value;

            let data = await axios.put('http://localhost:8080/api/edit-document', {
                id: this.docDataEdit.id,
                nameDocument: nameDocument,
                content: this.bookContentEdit,
                smallDescription: smallDescription,
                imageDocument: imageDocument,
                publisherId: this.dataPublisherEdit,
                authorId: this.dataAuthorEdit,
                categoryId: this.dataCategoryEdit
            });
            if(data.data.errMessage == "Error from server..."){
                alert("Sửa sách thất bại !");
            }else{
                alert("Sửa sách thành công !");
                let listDoc = await axios.get('http://localhost:8080/api/get-list-documents');
                this.listDoc = listDoc.data.listDocs;

                this.openPopup = false;
            }
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
    display: block;
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
    