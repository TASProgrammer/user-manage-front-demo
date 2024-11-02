"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {Provider, useDispatch} from "react-redux";
import store, {AppDispatch} from "@/stores";
import {useCallback, useEffect} from "react";
import {getLoginUserUsingGet} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import BasicLayout from "@/layouts/BasicLayout";
import AccessLayout from "@/access/AccessLayout";


const InitLayout: React.FC<
    Readonly<{
      children: React.ReactNode;
    }>
> = ({children}) => {
  // 从 react-redux 中获取 dispatch 函数，用于更新 Redux store 中的状态。
  const dispatch = useDispatch<AppDispatch>();
  // 初始化全局用户状态
  // 使用 useCallback 钩子来 memoize 这个函数，避免每次渲染时重新创建。
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // 更新全局用户状态
      dispatch(setLoginUser(res.data));
    } else {
      // 仅用于测试
      // setTimeout(() => {
      //   const testUser = {
      //     userName: "测试登录",
      //     id: 1,
      //     userAvatar: "https://www.code-nav.cn/logo.png",
      //     userRole: ACCESS_ENUM.ADMIN
      //   };
      //   dispatch(setLoginUser(testUser));
      // }, 3000);
    }
  }, []);
  // 使用 useEffect 钩子，在组件挂载时调用 doInitLoginUser 函数，确保只执行一次。
  // 只执行一次
  useEffect(() => {
    doInitLoginUser();
  }, []);
  return children;
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
    <body>
     {/*用于注册 Ant Design 的组件和样式，确保 Ant Design 组件能够正常工作。*/}
    <AntdRegistry>
        {/*从 react-redux 中导入，用于将 Redux store 提供给整个应用。*/}
        <Provider store={store}>
            {/*包裹在 Provider 内，确保 InitLayout 可以访问 Redux store。*/}
            {/*负责初始化全局用户状态。*/}
            <InitLayout>
                {/*一个基本的布局组件，用于提供页面的基本结构。*/}
                <BasicLayout>
                    {/*一个用于处理权限的布局组件，包裹 children，确保只有授权的用户才能访问某些内容。*/}
                    <AccessLayout>{children}</AccessLayout>
                </BasicLayout>
            </InitLayout>
        </Provider>
    </AntdRegistry>
    </body>
    </html>
  );
}
