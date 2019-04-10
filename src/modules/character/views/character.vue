<template>
  <div>
    <characterHead @handlerSearch="handlerSearch" :system="system"/>
    <addCharacter @addCharacter="refreshAddList" :system="system"/>
    <characterLists
      :characterLists="characterLists.list"
      :system="system"
      @submitModify="refreshModifyList"
      @submitDel="refreshDelList"
      @submitAuthor="refreshAutherList"
      
    />
    <div class="table-footer-pagination">
      <span>
        共：
        <span>{{characterLists.total}}</span> 条
      </span>
      <pagination :pageinaPages="characterLists" @handlerChangePage="handlerChangePage"/>
      <div class="pageNum">
        <div class="goto" @click="goToPage(pageNum)">前往</div>
        <el-input size="mini" class="pageSize" v-model.trim="pageNum" placeholder></el-input>
        <div>页</div>
      </div>
    </div>
  </div>
</template>

<script>
import characterHead from "../components/characterHead";
import addCharacter from "../components/addCharacter";
import characterLists from "../components/characterContent";
import pagination from "../components/pagination";
import CommonTable from "../../../components/commonTable/index.vue";
import {
  getCharacterList,
  searchCharacterList,
  getAssociatedSystem
} from "../api.js";
import "../styles/character.scss";
export default {
  name: "character",
  components: {
    characterHead,
    addCharacter,
    characterLists,
    pagination,
    CommonTable
  },
  data() {
    return {
      characterLists: {},
      totalPages: 60,
      pageNum: "",
      system: []
    };
  },
  mounted() {
    this.getCharacterLists();
    this.getAssociatedSystemList();
  },
  methods: {
    getAssociatedSystemList() {
      getAssociatedSystem()
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.system = sucessData.data.data;
          }
        })
        .catch(error => {
          console.log("error");
        });
    },
    characterList(params) {
      getCharacterList(params)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.characterLists = {};
            this.characterLists = {
              ...this.characterLists,
              ...sucessData.data.data
            };
          }
        })
        .catch(error => {
          console.log("error");
        });
    },
    getCharacterLists() {
      let params = {
        pageSize: 10,
        pageNo: 1,
        systemId: "",
        common: "",
        name: "",
        code: ""
      };
      this.characterList(params);
    },
    refreshModifyList() {
      let params = {
        pageSize: 10,
        pageNo: 1,
        systemId: "",
        common: "",
        name: "",
        code: ""
      };
      this.characterList(params);
    },
    refreshAddList() {
      let params = {
        pageSize: 10,
        pageNo: 1,
        systemId: "",
        common: "",
        name: "",
        code: ""
      };
      this.characterList(params);
    },
    refreshDelList() {
      let params = {
        pageSize: 10,
        pageNo: 1,
        systemId: "",
        common: "",
        name: "",
        code: ""
      };
      this.characterList(params);
    },
    refreshAutherList() {
      let params = {
        pageSize: 10,
        pageNo: 1,
        systemId: "",
        common: "",
        name: "",
        code: ""
      };
      this.characterList(params);
    },
    handlerSearch(item) {
      let params = {
        pageSize: 10,
        pageNo: 1,
        systemId: item.system,
        common: "",
        name: item.name,
        code: item.coding
      };
      searchCharacterList(params)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.characterLists = {};
            this.characterLists = {
              ...this.characterLists,
              ...sucessData.data.data
            };
          }
        })
        .catch(error => {
          console.log("error");
        });
    },
    handlerChangePage(pageNum) {
      let params = {
        pageSize: 10,
        pageNo: pageNum,
        systemId: "",
        common: "",
        name: "",
        code: ""
      };
      this.characterList(params);
    },
    goToPage(pageNum) {
      let params = {
        pageSize: 10,
        pageNo: pageNum,
        systemId: "",
        common: "",
        name: "",
        code: ""
      };
      this.characterList(params);
    }
  }
};
</script>