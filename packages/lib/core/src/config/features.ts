/**
 * 内部行为开关: 不暴露到配置文件, 已按本 fork 的既定行为固定。
 *
 * 为什么不是 ENV: 这些值在部署之间不需要变化, 留在配置里只会增加
 * 使用者要理解的选项数量; 同时它们仍在 `FEATURES` 对象上保持可变,
 * 便于单元测试临时翻转分支。
 */
export const FEATURES = {
    /**
     * 是否优先用 Bot API 10.1+ 的 rich_message 发送(GFM markdown 由客户端原生渲染)。
     * 关闭: 全部走 sendMessage + HTML 转换, 兼容所有客户端。
     * 旧客户端收到富文本会显示"请更新"甚至空白, 且服务端仍返回 200 无法感知。
     */
    richMessageMode: false,
    /**
     * 长回复整条包一层 <blockquote expandable>。
     * 低于 EXPANDABLE_REPLY_MIN_LENGTH(100 字符)的短回复不包:
     * 不足 3 行时客户端不给展开箭头, 只会多出一条竖条。
     */
    expandableReply: true,
    /**
     * 表格渲染方式: true=转列表(可整条折叠), false=<pre> 保留竖线对齐(不可折叠)。
     * Bot API 不允许 <pre> 嵌在 <blockquote> 内, 含表格的回复只有转列表才能折叠。
     */
    tableAsList: true,
    /**
     * 围栏代码块拆出来单独发一条(reply 到正文), 正文因此能正常折叠。
     * 仅影响最终消息, 流式过程帧不拆。
     */
    splitCodeBlock: true,
    /** 是否允许 Telegram 生成链接预览卡片。关闭时所有发送路径统一补 is_disabled。 */
    enableLinkPreview: false,
};
