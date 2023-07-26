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
        GoLogin
      </Button>
    ),
    message,
    description,
  });
};
