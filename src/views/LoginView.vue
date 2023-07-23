<script lang="ts">
import {
  LockOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import http from "@/utils/request";
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { setItem, getItem, removeItem } from "@/utils/cookie";
import { removeToken, setToken } from "@/utils/auth";
import { message } from "ant-design-vue";

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    SafetyOutlined,
  },
  setup() {
    const formState = reactive({
      aaa: 1,
      captchaEnabled: true,
      loading: false,
      codeUrl: "",
      username: getItem("username"),
      password: decrypt(getItem("password")),
      uuid: "",
      code: "",
      rememberMe: getItem("rememberMe") === "true" ? true : false,
    });
    function getCodeImg() {
      return http.get("/file/captcha/getCaptchaImage").then((data: any) => {
        if (data) {
          formState.codeUrl = "data:image/gif;base64," + data.img;
          formState.uuid = data.uuid;
        }
      });
    }
    const router = useRouter();
    onMounted(() => {
      removeToken();
      getCodeImg();
    });
    const onFinish = () => {
      formState.loading = true;
      if (formState.rememberMe) {
        setItem("username", formState.username, 30);
        setItem("password", encrypt(formState.password || ""), 10);
        setItem("rememberMe", `${formState.rememberMe}`, 10);
      } else {
        removeItem("username");
        removeItem("password");
        removeItem("rememberMe");
      }
      const params = {
        username: formState.username,
        password: formState.password,
        uuid: formState.uuid,
        code: formState.code,
      };
      http.post("/system/login", params).then((data: any) => {
        if (data) {
          setToken(data.token);
          router.push("/wf/home");
        } else {
          getCodeImg();
          formState.code = "";
        }
        formState.loading = false;
      });
    };
    return { formState, getCodeImg, onFinish,message };
  },
});
</script>


<template>
  <div class="login">
    <a-form
      ref="formRef"
      :model="formState"
      class="login-form"
      @finish="onFinish"
    >
      <h3 class="title">欣和シッピング</h3>
      <a-form-item
        name="username"
        :rules="[{ required: true, message: 'アカウントが必須' }]"
      >
        <a-input
          v-model:value="formState.username"
          auto-complete="off"
          placeholder="アカウント"
          class="custom-input"
        >
          <template #prefix>
            <user-outlined style="color: grey" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        name="password"
        :rules="[{ required: true, message: 'パスワードが必須' }]"
      >
        <a-input
          v-model:value="formState.password"
          type="password"
          auto-complete="off"
          placeholder="パスワード"
          class="custom-input"
        >
          <template #prefix>
            <lock-outlined style="color: grey" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        v-if="formState.captchaEnabled"
        name="code"
        :rules="[{ required: true, message: '認証コードが必須' }]"
      >
        <a-input
          v-model:value="formState.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          class="custom-input"
        >
          <template #prefix>
            <safety-outlined style="color: grey" />
          </template>
        </a-input>
        <div class="login-code">
          <img
            :src="formState.codeUrl"
            @click="getCodeImg"
            class="login-code-img"
          />
        </div>
      </a-form-item>
      <a-form-item name="rememberMe">
        <a-checkbox v-model:checked="formState.rememberMe">
          パスワードの記憶
        </a-checkbox>
      </a-form-item>
      <a-form-item style="width: 100%">
        <a-button
          :loading="formState.loading"
          size="medium"
          type="primary"
          style="width: 100%"
          html-type="submit"
        >
          <span v-if="!formState.loading">登 录</span>
          <span v-else>登 录 中...</span>
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/bg1.png");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .custom-input {
    height: 38px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
