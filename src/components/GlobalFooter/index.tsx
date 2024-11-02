import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="global-footer">
      <div>© {currentYear} 用户管理平台</div>
      <div>
        <a href="https://www.github.com/jhaugus" target="_blank">
          作者：蓝花晨月夕
        </a>
      </div>
    </div>
  );
}
