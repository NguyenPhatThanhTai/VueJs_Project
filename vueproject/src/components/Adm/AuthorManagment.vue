<template>
<div id="BookManagment">
    <input type="checkbox" id="nav-toggle">
    <SidebarAdm/>
    <div class="main-content">
        <HeaderAdm/>
        <main id="AdmMain">
            <div class="tittle">
                <h3>Quản lý tác giả</h3>
            </div>

            <div class="inputContain">
                <form v-on:submit.prevent="savedAuthor" method="post">
                    <div class="leftInput">
                        <input type="text" name="AuthorName" placeholder="Tên tác giả mới" required>
                        <input type="text" name="AuthorCover" placeholder="URL ảnh tác giả" required>
                        <input type="text" name="AuthorBirthday" placeholder="Năm sinh tác giả" required>
                        <input type="text" name="AuthorDescription" placeholder="Miêu tả ngắn về tác giả" required>
                    </div>
                    <input class="submit" type="submit" value="Thêm tác giả">
                </form>
                <div style="clear: both;"></div>
                <div class="listCourse">
                    <table>
                        <tr>
                            <th>Mã tác giả</th>
                            <th>Tên tác giả</th>
                            <th>URL ảnh tác giả</th>
                            <th>Năm sinh tác giả</th>
                            <th>Miêu tả ngắn về tác giả</th>
                        </tr>
                        <tr v-for="au in listAuthor" v-bind:key="au.id">
                            <td>{{au.id}}</td>
                            <td>{{au.nameAuthor}}</td>
                            <td>{{au.imageAuthor}}</td>
                            <td>{{au.birthday}}</td>
                            <td>{{au.description}}</td>
                            <td>
                                <p id="detail" class="clickUpdate" v-on:click="OpenPopupForChanceUser(au.id)">Sửa</p>
                                <p id="delete" v-on:click="deleteAu(au.id)">Xóa</p>
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
                        <h2>Cập nhật tác giả</h2>
                    </div>
                    <div class="modal-body">
                        <form v-on:submit.prevent="editAu" method="post">
                            <div class="leftInput">
                                <input type="text" name="AuthorNameEdit" placeholder="Tên tác giả" required v-model="auDataEdit.nameAuthor">
                                <input type="text" name="AuthorCoverEdit" placeholder="URL ảnh đại diện tác giả" required v-model="auDataEdit.imageAuthor">
                                <input type="text" name="AuthorBirthdayEdit" placeholder="Năm sinh tác giả" required v-model="auDataEdit.birthday">
                                <input type="text" name="AuthorDescriptionEdit" placeholder="Miêu tả ngắn về tác giả" required v-model="auDataEdit.description">
                            </div>
                            <input class="submit" type="submit" value="Sửa tác giả">
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
</template>
<script>
    import HeaderAdm from './HeaderAdmComponent.vue'
    import SidebarAdm from './SidebarAdmComponent.vue'
    import axios from 'axios'

    export default {
    name: 'BookManagment',
    components:{
      HeaderAdm,
      SidebarAdm,
    },
    data: function(){
        return{
            listAuthor: [],
    
            dataAuthor: null,
            
            openPopup : false,
            auDataEdit: null,
            dataAuthorEdit: null,
        }
    },
    async mounted(){
        if(this.$session.get('admin') == null){
            this.$router.push('/Adm/loginAdm')
        }

        let listAuthor = await axios.get('http://localhost:8080/api/get-list-author');

        this.listAuthor = listAuthor.data.info;
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
        async savedAuthor(e) {
            var nameAuthor = e.target.elements.AuthorName.value;
            var birthday = e.target.elements.AuthorBirthday.value;
            var imageAuthor = e.target.elements.AuthorCover.value;
            var description = e.target.elements.AuthorDescription.value;
            
            let data = await axios.post('http://localhost:8080/api/create-new-author', {
                nameAuthor: nameAuthor,
                birthday: birthday,
                imageAuthor: imageAuthor,
                description: description,
            });
            if(data.data.errMessage == "Error from server..."){
                alert("Thêm tác giả thất bại !");
            }else{
                let listAuthor = await axios.get('http://localhost:8080/api/get-list-author');

                this.listAuthor = listAuthor.data.info;
                
                alert("Thêm tác giả thành công !");
            }
        },
        async deleteAu(id){
            let data = await axios.delete('http://localhost:8080/api/delete-author?id=' + id);

            if(data.data.errMessage == "Error from server..."){
                alert("Xóa tác giả thất bại !");
            }else{
                let listAuthor = await axios.get('http://localhost:8080/api/get-list-author');

                this.listAuthor = listAuthor.data.info;

                alert("Xóa tác giả thành công !");
            }
        },
        async getDetailToEdit(id) {
            let data = await axios.get('http://localhost:8080/api/get-info-author?id=' + id);

            this.auDataEdit = data.data.info;
            this.openPopup = true;
        },
        async editAu(e){
            var nameAuthor = e.target.elements.AuthorNameEdit.value;
            var birthday = e.target.elements.AuthorBirthdayEdit.value;
            var imageAuthor = e.target.elements.AuthorCoverEdit.value;
            var description = e.target.elements.AuthorDescriptionEdit.value;

            let data = await axios.put('http://localhost:8080/api/edit-author', {
                id: this.auDataEdit.id,
                nameAuthor: nameAuthor,
                birthday: birthday,
                imageAuthor: imageAuthor,
                description: description,
            });
            if(data.data.errMessage == "Error from server..."){
                alert("Sửa tác giả thất bại !");
            }else{
                alert("Sửa tác giả thành công !");
                let listAuthor = await axios.get('http://localhost:8080/api/get-list-author');
                this.listAuthor = listAuthor.data.info;

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
    