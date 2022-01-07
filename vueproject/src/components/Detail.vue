<template>
  <div id="detail" class="UserContain">
    <HeaderUser />
    <main id="UserMain">
      <div class="left_content">
        <div class="book">
          <div class="detailBookchild">
            <div id="coverBook">
              <img v-bind:src="'' + image" />
            </div>
            <div id="descripsionBook">
              <h1>{{ bookId }}</h1>
              <p>{{ bookDetail.nameDocument }}</p>
              <p>Số trang: {{ bookDetail.pageNumber }}</p>
              <p>Tác giả: {{ bookDetail.authorData.nameAuthor }}</p>
              <p>Nhà xuất bản: {{ bookDetail.publisherData.namePublisher }}</p>
              <p>Thể loại: {{ bookDetail.categoryData.nameCategory }}</p>
              <a v-on:click="GoToRead(bookId)">Bắt đầu đọc</a>
            </div>
          </div>
          <div class="scriptAboutBook">
            <h3><b>- Lời nói đầu</b></h3>
            <p>
              {{ bookDetail.smallDescription }}
              <a
                href="#"
                style="text-decoration: none; color: rgb(26, 141, 187)"
                >Đọc tiếp</a
              >
            </p>
          </div>
        </div>
      </div>
      <RightNavigation />
      <FooterUser />
    </main>
  </div>
</template>

<style>
.detailBookchild {
  width: 100%;
  margin: 50px 10px 50px 10px;
  display: flex;
  justify-content: center;
}

.detailBookchild #coverBook img {
  width: 300px;
}

.detailBookchild #descripsionBook {
  padding: 10px 10px 10px 30px;
  line-height: 50px;
  position: relative;
}

.detailBookchild #descripsionBook h1 {
  color: rgb(15, 124, 214);
}

.detailBookchild #descripsionBook a {
  padding: 5px;
  border-radius: 8px;
  background-color: rgb(85, 163, 236);
  color: #fff;
  width: 100%;
  position: absolute;
  bottom: 10px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}

.detailBookchild #descripsionBook a:hover {
  background-color: rgb(49, 141, 226);
}

.scriptAboutBook {
  width: 100%;
  padding: 10px;
}

.footer {
  width: 100%;
  height: 200px;
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

.left_content {
  width: 70%;
  float: left;
}

@media only screen and (max-width: 600px) {
  body {
    margin: 0;
    position: relative;
  }
  .detailBookchild {
    width: 100%;
    margin: 10px;
  }
  .detailBookchild #coverBook img {
    width: 150px;
    margin: 10px;
  }
  .footer {
    height: fit-content;
  }
  .footer div {
    width: 100%;
  }
  .left_content {
    width: 100%;
  }
  .detailBookchild #descripsionBook a {
    position: relative;
    display: inline-block;
  }
}
</style>

<script>
import HeaderUser from "./HeaderUserComponent.vue";
import FooterUser from "./FooterUserComponent.vue";
import RightNavigation from "./RightNavigation.vue";
import axios from "axios";

export default {
  name: "Detail",
  components: {
    HeaderUser,
    FooterUser,
    RightNavigation,
  },
  data: function () {
    return {
      bookId: "",
      bookDetail: {},
      image: "",
    };
  },
  async mounted() {
    let data = await axios.get(
      "http://localhost:8080/api/get-detail-document?id=" + this.$route.query.id
    );
    this.bookDetail = data.data.info;
    this.image = data.data.info.imageDocument;
    //this.ListBook = data.listDocs;
    this.dataReady = true;
  },
  async created() {
    this.bookId = this.$route.query.id;
  },
  methods: {
    GoToRead(id) {
      this.$router.push({
        path: "read",
        query: { id: id },
      });
    },
  },
};
</script>
