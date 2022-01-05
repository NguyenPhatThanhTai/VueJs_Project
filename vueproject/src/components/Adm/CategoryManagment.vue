<template>
<div id="BookManagment">
    <input type="checkbox" id="nav-toggle">
    <SidebarAdm/>
    <div class="main-content">
        <HeaderAdm/>
        <main id="AdmMain">
            <div class="tittle">
                <h3>Quản lý chủ đề, thể loại</h3>
            </div>

            <div class="inputContain">
                <form v-on:submit.prevent="savedCategory" method="post">
                    <div class="leftInput">
                        <input type="text" name="CategoryName" placeholder="Tên thể loại, chủ đề mới" required>
                        <input type="text" name="CategoryCover" placeholder="URL ảnh thể loại, chủ đề" required>
                        <input type="text" name="CategoryDescription" placeholder="Miêu tả ngắn về thể loại, chủ đề" required>
                    </div>
                    <input class="submit" type="submit" value="Thêm thể loại, chủ đề">
                </form>
                <div style="clear: both;"></div>
                <div class="listCourse">
                    <table>
                        <tr>
                            <th>Mã thể loại, chủ đề</th>
                            <th>Tên thể loại, chủ đề</th>
                            <th>URL ảnh thể loại, chủ đề</th>
                            <th>Miêu tả ngắn về thể loại, chủ đề</th>
                        </tr>
                        <tr v-for="cate in listCategory" v-bind:key="cate.id">
                            <td>{{cate.id}}</td>
                            <td>{{cate.nameCategory}}</td>
                            <td>{{cate.imageCategory}}</td>
                            <td>{{cate.description}}</td>
                            <td>
                                <p id="detail" class="clickUpdate" v-on:click="OpenPopupForChanceUser(cate.id)">Sửa</p>
                                <p id="delete" v-on:click="deleteCate(cate.id)">Xóa</p>
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
                        <h2>Cập nhật thể loại, chủ đề</h2>
                    </div>
                    <div class="modal-body">
                        <form v-on:submit.prevent="editCate" method="post">
                            <div class="leftInput">
                                <input type="text" name="CategoryNameEdit" placeholder="Tên thể loại, chủ đề" required v-model="cateDataEdit.nameCategory">
                                <input type="text" name="CategoryCoverEdit" placeholder="URL ảnh thể loại, chủ đề" required v-model="cateDataEdit.imageCategory">
                                <input type="text" name="CategoryDescriptionEdit" placeholder="Miêu tả ngắn về thể loại, chủ đề" required v-model="cateDataEdit.description">
                            </div>
                            <input class="submit" type="submit" value="Sửa thể loại, chủ đề">
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
            listCategory: [],
    
            dataCategory: null,
            
            openPopup : false,
            cateDataEdit: null,

            dataAuthorEdit: null,
        }
    },
    async mounted(){
        if(this.$session.get('admin') == null){
            this.$router.push('/Adm/loginAdm')
        }
        
        let listCategory = await axios.get('http://localhost:8080/api/get-list-category');

        this.listCategory = listCategory.data.info;
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
        async savedCategory(e) {
            var nameCategory = e.target.elements.CategoryName.value;
            var imageCategory = e.target.elements.CategoryCover.value;
            var description = e.target.elements.CategoryDescription.value;
            
            let data = await axios.post('http://localhost:8080/api/create-new-category', {
                nameCategory: nameCategory,
                imageCategory: imageCategory,
                description: description,
            });
            if(data.data.errMessage == "Error from server..."){
                alert("Thêm thể loại, chủ đề thất bại !");
            }else{
                let listCategory = await axios.get('http://localhost:8080/api/get-list-category');

                this.listCategory = listCategory.data.info;
                
                alert("Thêm thể loại, chủ đề thành công !");
            }
        },
        async deleteCate(id){
            let data = await axios.delete('http://localhost:8080/api/delete-category?id=' + id);

            if(data.data.errMessage == "Error from server..."){
                alert("Xóa thể loại, chủ đề thất bại !");
            }else{
                let listCategory = await axios.get('http://localhost:8080/api/get-list-category');

                this.listCategory = listCategory.data.info;

                alert("Xóa thể loại, chủ đề thành công !");
            }
        },
        async getDetailToEdit(id) {
            let data = await axios.get('http://localhost:8080/api/get-info-category?id=' + id);

            this.cateDataEdit = data.data.info;
            this.openPopup = true;
        },
        async editCate(e){
            var nameCategory = e.target.elements.CategoryNameEdit.value;
            var imageCategory = e.target.elements.CategoryCoverEdit.value;
            var description = e.target.elements.CategoryDescriptionEdit.value;

            let data = await axios.put('http://localhost:8080/api/edit-category', {
                id: this.cateDataEdit.id,
                nameCategory: nameCategory,
                imageCategory: imageCategory,
                description: description,
            });
            if(data.data.errMessage == "Error from server..."){
                alert("Sửa thể loại, chủ đề thất bại !");
            }else{
                alert("Sửa thể loại, chủ đề thành công !");
                let listCategory = await axios.get('http://localhost:8080/api/get-list-category');
                this.listCategory = listCategory.data.info;

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
    