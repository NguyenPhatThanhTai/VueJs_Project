<template>
<div id="BookManagment">
    <input type="checkbox" id="nav-toggle">
    <SidebarAdm/>
    <div class="main-content">
        <HeaderAdm/>
        <main id="AdmMain">
            <div class="tittle">
                <h3>Quản lý nhà xuất bản</h3>
            </div>

            <div class="inputContain">
                <form v-on:submit.prevent="savedPublisher" method="post">
                    <div class="leftInput">
                        <input type="text" name="PublisherName" placeholder="Tên nhà xuất bản mới" required>
                        <input type="text" name="PublisherAddress" placeholder="Địa chỉ nhà xuất bản mới" required>
                        <input type="text" name="PublisherCover" placeholder="URL ảnh nhà xuất bản" required>
                        <input type="text" name="PublisherDescription" placeholder="Miêu tả ngắn về nhà xuất bản" required>
                    </div>
                    <input class="submit" type="submit" value="Thêm nhà xuất bản">
                </form>
                <div style="clear: both;"></div>
                <div class="listCourse">
                    <table>
                        <tr>
                            <th>Mã nhà xuất bản</th>
                            <th>Tên nhà xuất bản</th>
                            <th>Địa chỉ nhà xuất bản</th>
                            <th>URL ảnh nhà xuất bản</th>
                            <th>Miêu tả ngắn về nhà xuất bản</th>
                        </tr>
                        <tr v-for="pub in listPublisher" v-bind:key="pub.id">
                            <td>{{pub.id}}</td>
                            <td>{{pub.namePublisher}}</td>
                            <td>{{pub.address}}</td>
                            <td>{{pub.imagePublisher}}</td>
                            <td>{{pub.description}}</td>
                            <td>
                                <p id="detail" class="clickUpdate" v-on:click="OpenPopupForChanceUser(pub.id)">Sửa</p>
                                <p id="delete" v-on:click="deletePub(pub.id)">Xóa</p>
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
                        <h2>Cập nhật nhà xuất bản</h2>
                    </div>
                    <div class="modal-body">
                        <form v-on:submit.prevent="editPub" method="post">
                            <div class="leftInput">
                                <input type="text" name="PublisherNameEdit" placeholder="Tên nhà xuất bản" required v-model="pubDataEdit.namePublisher">
                                <input type="text" name="PublisherAddressEdit" placeholder="Địa chỉ nhà xuất bản" required v-model="pubDataEdit.address">
                                <input type="text" name="PublisherCoverEdit" placeholder="URL ảnh nhà xuất bản" required v-model="pubDataEdit.imagePublisher">
                                <input type="text" name="PublisherDescriptionEdit" placeholder="Miêu tả ngắn về nhà xuất bản" required v-model="pubDataEdit.description">
                            </div>
                            <input class="submit" type="submit" value="Sửa nhà xuất bản">
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
            listPublisher: [],
    
            dataPublisher: null,
            
            openPopup : false,
            pubDataEdit: null,

            dataPublisherEdit: null,
        }
    },
    async mounted(){
        let listPublisher = await axios.get('http://localhost:8080/api/get-list-publisher');

        this.listPublisher = listPublisher.data.info;
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
        async savedPublisher(e) {
            var namePublisher = e.target.elements.PublisherName.value;
            var address = e.target.elements.PublisherAddress.value;
            var imagePublisher = e.target.elements.PublisherCover.value;
            var description = e.target.elements.PublisherDescription.value;
            
            let data = await axios.post('http://localhost:8080/api/create-new-publisher', {
                namePublisher: namePublisher,
                address: address,
                imagePublisher: imagePublisher,
                description: description,
            });
            if(data.data.errMessage == "Error from server..."){
                alert("Thêm nhà xuất bản thất bại !");
            }else{
                let listPublisher = await axios.get('http://localhost:8080/api/get-list-publisher');

                this.listPublisher = listPublisher.data.info;
                
                alert("Thêm nhà xuất bản thành công !");
            }
        },
        async deletePub(id){
            let data = await axios.delete('http://localhost:8080/api/delete-publisher?id=' + id);

            if(data.data.errMessage == "Error from server..."){
                alert("Xóa nhà xuất bản thất bại !");
            }else{
                let listPublisher = await axios.get('http://localhost:8080/api/get-list-publisher');

                this.listPublisher = listPublisher.data.info;

                alert("Xóa nhà xuất bản thành công !");
            }
        },
        async getDetailToEdit(id) {
            let data = await axios.get('http://localhost:8080/api/get-info-pubslisher?id=' + id);

            this.pubDataEdit = data.data.info;
            this.openPopup = true;
        },
        async editPub(e){
            var namePublisher = e.target.elements.PublisherNameEdit.value;
            var address = e.target.elements.PublisherAddressEdit.value;
            var imagePublisher = e.target.elements.PublisherCoverEdit.value;
            var description = e.target.elements.PublisherDescriptionEdit.value;

            let data = await axios.put('http://localhost:8080/api/edit-publisher', {
                id: this.pubDataEdit.id,
                namePublisher: namePublisher,
                address: address,
                imagePublisher: imagePublisher,
                description: description,
            });

            console.log(namePublisher);
            console.log(address);
            console.log(imagePublisher);
            console.log(description);
            console.log(this.pubDataEdit.id);

            if(data.data.errMessage == "Error from server..."){
                alert("Sửa thể loại, chủ đề thất bại !");
            }else{
                alert("Sửa thể loại, chủ đề thành công !");
                let listPublisher = await axios.get('http://localhost:8080/api/get-list-publisher');

                this.listPublisher = listPublisher.data.info;

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
    