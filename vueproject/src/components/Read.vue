<template>
    <div id="read" class="UserContain">
        <HeaderUser/>
        <main id="UserMain">
        <FwTurn/>
            <div class="toolBar" v-on:click="saveDoc" v-if="isSaved == true">
                <button>Lưu sách này</button>
            </div>
            <div class="toolBar" v-on:click="saveDoc" v-if="isSaved == false">
                <button>Huỷ lưu sách này</button>
            </div>
            <div class="read">
                <div id="loading" v-if="dataReady == false">
                    <div>
                        <img src="../../public/Bookloading.gif">
                        <b>Chúng tôi đang chuẩn bị sách cho bạn, vui lòng đợi trong giây lát...</b>
                    </div>
                </div>
                <div id="magazine" v-if="dataReady == true">
                    <div>
                        <img v-bind:src="'' + imageDoc" /> 
                    </div>
                    <div v-for="page in data"
                        v-bind:key="page.id"
                    >
                        <p id="single-page" v-html="page"></p>
                    </div>
                </div>
            </div>
            <FooterUser/>
        </main>
    </div>
</template>

<style>
        main{
            width: 100%;
        }
        .read {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            margin: 30px;
            min-height: 700px;
        }
        
        #magazine {
            width: 1000px;
            height: 700px;
            border: 1px solid rgb(0, 0, 0);
            box-shadow: 5px 10px;
        }
        
        #magazine #single-page {
            padding: 10px;
            border-left: 1px solid gray;
        }
        
        #magazine span {
            position: absolute;
            right: 10px;
            bottom: 10px;
        }
        
        #magazine img {
            width: 100%;
        }
        
        #magazine .turn-page {
            background-color: rgb(219, 177, 36);
            background-size: 100% 100%;
        }

        .page{
            background-color:#fff;
        }

        #loading{
            text-align: center;
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: center;
        }

        #loading img{
            display: block;
            text-align: center;
            width: 100%;
        }

        #loading b{
            display: block;
            text-align: center;
        }

        .toolBar{
            text-align: center;
        }

        .toolBar button{
            margin: 10px;
            padding: 10px;
            background-color: rgb(69, 161, 223);
            color: #fff;
            border: none;
            border-radius: 8px;
        }

</style>

<script>
    import HeaderUser from './HeaderUserComponent.vue'
    import FooterUser from './FooterUserComponent.vue'
    import { FwTurn } from "vue-turnjs";
    import $ from 'jquery'
    import axios from 'axios'

    export default {
    name: 'read',
    components:{
      HeaderUser,
      FooterUser,
      FwTurn 
    },
    data: function(){
        return{
            data: null,
            imageDoc: null,
            dataReady : false,
            isSaved: false,
        }
    },
    async mounted(){
            if(this.$session.get('user') == null){
                this.$router.push('/login')
            }

            let data = await axios.get("http://localhost:8080/api/get-document-by-id?id=" + this.$route.query.id);
            this.imageDoc = data.data.doc.imageDocument;
            this.data = data.data.doc.content;
            
            this.data = this.data.replace(/\n/g, "<br>");
            this.data = this.data.match(/.{1,1330}(\s|$)/g);
            
            let isSavedDoc = await axios.get("http://localhost:8080/api/check-saved-document?documentId="+this.$route.query.id+"&userId="+this.$session.get('user').id );
            if(isSavedDoc.data.message == "Not saved"){
                this.isSaved = true;
            }else{
                this.isSaved = false;
            }
            
            // this.$cookies.set("data", data.data.time.updated, "1h");// làm việc với cookie
            // this.data = this.$cookies.get("data");
            var that = this;
        setTimeout(function() {
            that.dataReady = true;
            that.loadEffectBook();
        }, 2000);
    },
    async created(){

    },
    methods:{
        loadEffectBook(){
        $(window).ready(function() {
            $('#magazine').turn({   
                display: 'double',
                acceleration: true,
                gradients: true,
                elevation: 50,
                when: {
                    turned: function() {
                        //Lấy trang hiện tại
                        console.log('Current view: ', $(this).turn('view'));    
                    }
                }
            });

            $('.previous').on('click', function(e) {
                e.preventDefault();
                $('#magazine').turn('previous');
            })

            $('.next').on('click', function(e) {
                e.preventDefault();
                $('#magazine').turn('next');
            })
        });

        $(window).bind('keydown', function(e) {
            if (e.keyCode == 37)
                $('#magazine').turn('previous');
            else if (e.keyCode == 39)
                $('#magazine').turn('next');
        });
        },
        async saveDoc() {
            let bookId = this.$route.query.id;
            let id = this.$session.get('user').id;
            let data = await axios.post("http://localhost:8080/api/save-document", {
                userId: id,
                documentId: bookId
            });
            if(data.data.message == "Saved document"){
                alert("Lưu thành công !");
            }else{
                alert("Huỷ lưu thành công !");
            }
            
            let isSavedDoc = await axios.get("http://localhost:8080/api/check-saved-document?documentId="+this.$route.query.id+"&userId="+this.$session.get('user').id );
            if(isSavedDoc.data.message == "Not saved"){
                this.isSaved = true;
            }else{
                this.isSaved = false;
            }
        }
    }
}
</script>
