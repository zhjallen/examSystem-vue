<template>
  <div>
    <characterTable
      :characterLists="characterLists"
      @viewClick="viewClick"
      @authorClick="authorClick"
      @modifyClick="modifyClick"
      @delClick="delClick"
    />
    <!-- 修改弹出框 -->
    <modify
      :characterList="modifyList"
      :modifyInfor="modifyInfor"
      :system="system"
      @submitModify="submitModify"
      @closeModify="closeModify"
    />
    <!-- 删除弹出框 -->
    <delCharact
      :characterLists="modifyList"
      :deleteCharacter="deleteCharacter"
      @closeDel="closeDel"
      @submitDel="submitDel"
    />
    <!-- 授权弹出框 -->
    <author
      :resourceLists="resourceLists"
      :author="author"
      :characterLists="modifyList"
      :checkedKeys="checkedKeys"
      @submitAuthor="submitAuthor"
      @closeAuthor="closeAuthor"
    />
    <!-- 查看弹出框 -->
    <viewCharct
      :resourceLists="resourceLists"
      :view="view"
      :checkedKeys="checkedKeys"
      @closeView="closeView"
      @submitView="submitView"
    />
  </div>
</template>
<script>
import { updateCharacter, delCharacter, authority, resource } from "../api.js";
import characterTable from "./characterTable";
import delCharact from "./delCharacter";
import modify from "./modifyCharacter";
import viewCharct from "./viewCharcter";
import author from "./authorizeCharacter";
import { isEmpty } from "../../../utils/functions/isEmpty.js";
import { getListTree, arrayToObj } from "../../../utils/functions/array.ts";
export default {
  name: "CharacterLists",
  components: {
    delCharact,
    modify,
    viewCharct,
    author,
    characterTable
  },
  data() {
    return {
      view: false,
      author: false,
      modifyInfor: false,
      deleteCharacter: false,
      idx: -1,
      resourceLists: [],
      checkedKeys: [],
      modifyList: {}
    };
  },
  props: {
    characterLists: {
      type: Array,
      default: () => []
    },
    system: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    viewClick(index) {
      this.view = true;
      const item = this.characterLists[index];
      resource(item.id)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.checkedKeys = [];
            sucessData.data.data.forEach(item => {
              if (item.selected) {
                this.checkedKeys.push(item.treeId);
              }
            });
            console.log("checkedKeys", this.checkedKeys);
            const resourceList = arrayToObj(sucessData.data.data, "treeId");
            const treeList = getListTree(resourceList, "treeParentId");
            this.resourceLists = treeList;
          }
        })
        .catch(error => {
          console.log("error");
        });
    },
    authorClick(index) {
      this.author = true;
      const item = this.characterLists[index];
      this.modifyList = {
        id: item.id
      };
      resource(item.id)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.checkedKeys = [];
            sucessData.data.data.forEach(item => {
              if (item.selected) {
                this.checkedKeys.push(item.treeId);
              }
            });
            const resourceList = arrayToObj(sucessData.data.data, "treeId");
            const treeList = getListTree(resourceList, "treeParentId");
            this.resourceLists = treeList;
          }
        })
        .catch(error => {
          console.log("error");
        });
    },
    modifyClick(index) {
      this.modifyInfor = true;
      const item = this.characterLists[index];
      this.modifyList = {
        name: item.name,
        code: item.code,
        system: item.systemName,
        description: item.description,
        id: item.id,
        resources: item.resources
      };
    },
    delClick(index) {
      this.deleteCharacter = true;
      const item = this.characterLists[index];
      this.modifyList = {
        name: item.name,
        id: item.id
      };
    },
    //修改
    submitModify(characterList, formName) {
      if (characterList.system === "权限管理") {
        characterList.system = 1;
      }
      let params = {
        name: characterList.name,
        code: characterList.code,
        systemId: characterList.system,
        description: characterList.desc,
        common: false,
        id: characterList.id,
        roleMarketEntities: []
      };

      if (
        isEmpty(params.systemId) &&
        isEmpty(params.id) &&
        isEmpty(params.name) &&
        isEmpty(params.code)
      ) {
        updateCharacter(params)
          .then(sucessData => {
            if (sucessData.status === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.modifyInfor = false;
              this.$emit("submitModify");
              console.log(sucessData, "success");
            }
          })
          .catch(error => {
            console.log("error");
          });
      } else {
        this.modifyInfor = true;
        this.$message.error("请重新修改");
      }
    },
    closeModify() {
      this.modifyInfor = false;
    },
    closeAuthor() {
      this.author = false;
    },
    submitAuthor(id, arr) {
      if (arr.join(",")) {
        arr = arr.join(",");
      } else {
        arr = String("");
      }
      let params = {
        roleId: id,
        resourceIds: arr
      };
      authority(params)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.$message({
              message: "授权成功",
              type: "success"
            });
            this.$emit("submitAuthor");
            console.log(sucessData, "authority");
          }
        })
        .catch(error => {
          console.log("error");
        });
      this.author = false;
    },
    submitView() {
      this.view = false;
    },
    closeView() {
      this.view = false;
    },
    closeDel() {
      this.deleteCharacter = false;
    },
    submitDel(id) {
      let ids = {
        ids: id
      };
      delCharacter(ids)
        .then(sucessData => {
          if (sucessData.status === 200) {
            this.characterLists.splice(this.idx, 1);
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.$emit("submitDel");
            console.log(sucessData, "success");
          }
        })
        .catch(error => {
          console.log("error");
        });
      this.deleteCharacter = false;
    }
  }
};
</script>
