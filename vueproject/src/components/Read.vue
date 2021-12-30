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
                        <img src="https://firstnews.com.vn/public/uploads/products/dac-nhan-tam-biamem2019-76k-bia11.jpg">
                    </div>
                    <div>
                        <p>{{data}}</p>
                    </div>
                    <div>
                        <p>Mục lục cuốn sách Đắc Nhân Tâm: Phần I – Chương 1: Muốn lấy mật đừng phá tổ ong Phần I – Chương 2 : Bí Mật Lớn Nhất Trong Phép Ứng Xử Phần I – Chương 3: Ai Làm Được Điều Dưới Đây, Người Đó Sẽ Có Cả Thế Giới Phần II – Chương 4: Thành
                            Thật Quan Tâm Đến Người Khác Phần II – Chương 5: Cách Đơn Giản Để Tạo Ấn Tượng Tốt Đẹp Phần II – Chương 6: Để Mọi Việc Luôn Được Suông Sẻ Phần II – Chương 7: Để Trở Thành Người Giao Tiếp Khéo Léo Phần II – Chương 8: Thu Hút Sự
                            Quan Tâm Của Người Khác Phần II – Chương 9: Để Người Khác Yêu Thích Bạn Ngay Lập Tức Phần III – Chương 10: Không Tranh Cãi ! Phần III – Chương 11: Tôn Trọng Ý Kiến Người Khác Phần III – Chương 12: Thẳng Thắn Thừa Nhận Sai Lầm Của
                            Mình Phần III – Chương 13: Mật Ngọt Trong Giao Tiếp Phần III – Chương 14: Bí Quyết Của Socrates Phần III – Chương 15: Khôn Ngoan Khi Gặp Đối Đầu Phần III – Chương 16: Để Nhận Được Sự Hợp Tác Cao Nhất Phần III – Chương 17: Đặt Mình
                            Vào Hoàn Cảnh Người Khác Phần III – Chương 18: Điều Mọi Người Mong Muốn Phần III – Chương 19 : Khơi Gợi Sự Cao Thượng Phần III – Chương 20: Trình Bày Vấn Đề Một Cách Sinh Động Phần III – Chương 21: Khơi Gợi Tinh Thần Vượt Lên Thử
                            Thách Phần IV – Chương 22: Trước Khi Phê Bình, Hãy Khen Ngợi Phần IV – Chương 23: Phê Bình Một Cách Gián Tiếp Phần IV – Chương 24: Nhìn Nhận Sai Lầm Của Bản Thân Trước Khi Phê Bình Người Khác Phần IV – Chương 25: Gợi Ý Thay Vì
                            Ra Lệnh Phần IV – Chương 26: Giữ Thể Diện Cho Người Khác Phần IV – Chương 27: Khuyến Khích Người Khác Phần IV – Chương 28: Cho Người Khác Niềm Tự Hào Phần IV – Chương 30: Tôn Vinh Người Khác
                        </p>
                    </div>
                    <div>
                        <p>Đắc nhân tâm – How to win friends and Influence People của Dale Carnegie là quyển sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thời đại. Tác phẩm đã được chuyển ngữ sang hầu hết các thứ tiếng trên thế giới và
                            có mặt ở hàng trăm quốc gia. Đây là quyển sách duy nhất về thể loại self-help liên tục đứng đầu danh mục sách bán chạy nhất (best-selling Books) do báo The New York Times bình chọn suốt 10 năm liền. Riêng bản tiếng Anh của sách
                            đã bán được hơn 15 triệu bản trên thế giới. Tác phẩm có sức lan toả vô cùng rộng lớn – dù bạn đi đến bất cứ nơi đâu, bất kỳ quốc gia nào cũng đều có thể nhìn thấy. Tác phẩm được đánh giá là quyển sách đầu tiên và hay nhất, có ảnh
                            hưởng làm thay đổi cuộc đời của hàng triệu người trên thế giới. Không còn nữa khái niệm giới hạn, Đắc Nhân Tâm là nghệ thuật thu phục lòng người, là làm cho tất cả mọi người yêu mến mình. Đắc nhân tâm và cái Tài trong mỗi người
                            chúng ta. Đắc Nhân Tâm trong ý nghĩa đó cần được thụ đắc bằng sự hiểu rõ bản thân, thành thật với chính mình, hiểu biết và quan tâm đến những người xung quanh để nhìn ra và khơi gợi những tiềm năng ẩn khuất nơi họ, giúp họ phát
                            triển lên một tầm cao mới. Đây chính là nghệ thuật cao nhất về con người và chính là ý nghĩa sâu sắc nhất đúc kết từ những nguyên tắc vàng của Dale Carnegie. Quyển sách Đắc nhắn tâm là cuốn sách “đầu tiên và hay nhất mọi thời đại
                            về nghệ thuật giao tiếp và ứng xử”, quyển sách đã từng mang đến thành công và hạnh phúc cho hàng triệu người trên khắp thế giới. Đắc Nhân Tâm là cuốn sách gối đầu giường về đối nhân xử thế.
                        </p>
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
            dataReady : false
        }
    },
    async mounted(){
            let data = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
            this.data = data.data.time.updated;
            // this.$cookies.set("data", data.data.time.updated, "1h");// làm việc với cookie
            // this.data = this.$cookies.get("data");
            var that = this;
        setTimeout(function() {
            that.dataReady = true;
            that.loadEffectBook();
        }, 3000);
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
