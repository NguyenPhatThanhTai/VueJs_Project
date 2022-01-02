<template>
    <div id="read" class="UserContain">
        <HeaderUser/>
        <main id="UserMain">
        <FwTurn/>
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
                        <p v-html="page"></p>
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
        
        #magazine p {
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
            dataReady : false
        }
    },
    async mounted(){
            let data = await axios.get("http://localhost:8080/api/get-document-by-id?id=" + this.$route.query.id);
            this.imageDoc = data.data.doc.imageDocument;
            this.data = data.data.doc.content;
            
            this.data = this.data.replace(/\n/g, "<br>");
            this.data = this.data.match(/.{1,1330}(\s|$)/g);
            
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
        }
    }
}
</script>
