export interface ValidateRule {
    required?: boolean;
    pattern?: RegExp;
    trigger?: 'blur' | 'validate';
    /** 最大长度 */
    max?: number;
    min?: number;
    message?: string;
}

export interface CompactFormBasicSectionMeta {
    type: string;
    key: string;
    validates?: ValidateRule[];
}

// cascader
export interface CompactCascaderMeta extends CompactFormBasicSectionMeta {
    type: 'CompactCascader';
    props: {
        title?: string;
        titleHint?: string;
        placeholder?: string;
        /** 获取列表数据 */
        fetchList: <T extends CascaderItem>(item: T) => T[] | Promise<T[]>;
        /** class */
        clazz?: string[];
        /** 文本对齐方式 */
        textAlign?: 'left' | 'center' | 'right';
        /** 是否显示右边的箭头 */
        rightArrow?: boolean;
    };
}

// input
export interface CompactInputMeta extends CompactFormBasicSectionMeta {
    type: 'CompactInput';
    props?: {
        title?: string;
        /** 是否显示星号 */
        required?: boolean;
        placeholder?: string;
        type?: 'text' | 'tel';
        /** 文本对齐方式 */
        textAlign?: 'left' | 'center' | 'right';
        /** class */
        clazz?: string[];
    };
}

// select
export interface CompactSelectMeta extends CompactFormBasicSectionMeta {
    type: 'CompactSelect';
    props?: {
        title?: string;
        /** 是否显示星号 */
        required?: boolean;
        placeholder?: string;
        /** 选项 */
        options?: ValueText[];
        /** class */
        clazz?: string[];
    };
}

// textarea
export interface CompactTextareaMeta extends CompactFormBasicSectionMeta {
    type: 'CompactTextarea';
    props?: {
        /** 标题 */
        title?: string;
        /** 占位 */
        placeholder?: string;
        /** class */
        clazz?: string[];
    };
}

// uploader
export interface CompactUploaderMeta extends CompactFormBasicSectionMeta {
    type: 'CompactUploader';
    props?: {
        /** 标题 */
        title?: string;
        /** 副标题 */
        titleHint?: string;
        /** 是否显示星号 */
        required?: boolean;
        /** 用于发送上传请求 */
        httpRequest: (imageInfo: ImageInfo) => ImageInfo | Promise<ImageInfo>;
        /** class */
        clazz?: string[];
    };
}

export type CompactFormSectionMeta = CompactCascaderMeta | CompactInputMeta | CompactSelectMeta | CompactTextareaMeta | CompactUploaderMeta;

export interface ValueText {
    value: any;
    text: string;
}

export interface ImageInfo {
    key: string;
    url: string;
    /** file: 上传后的文件链接 wechat: 微信临时文件 */
    mode: 'file' | 'wechat';
}

export interface CascaderItem {
    id: number;
    name: string;
}
