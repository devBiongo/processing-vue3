import { Button, notification } from "ant-design-vue";
import { removeToken } from "./auth";

export const appNotification = (message: string, description: string) => {
  notification["warning"]({
    btn: (
      <Button
        type="primary"
        onClick={() => {
          removeToken();
          location.reload();
        }}
      >
        再ログイン
      </Button>
    ),
    message,
    description,
  });
};
