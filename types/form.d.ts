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
    titleComponent: boolean;
    validates?: ValidateRule[];
}

// cascader
export interface CompactCascaderMeta extends CompactFormBasicSectionMeta {
    type: 'CompactCascader';
    titleComponent: true;
    props: {
        title?: string;
        titleHint?: string;
        placeholder?: string;
        /** 获取列表数据 */
        fetchList: <T extends CascaderItem>(item: T) => T[] | Promise<T[]>;
    };
}

// input
export interface CompactInputMeta extends CompactFormBasicSectionMeta {
    type: 'CompactInput';
    titleComponent: true;
    props?: {
        title?: string;
        /** 是否显示星号 */
        required?: boolean;
        placeholder?: string;
        type?: 'text' | 'tel';
        /** class */
        clazz?: string[];
    };
}

// select
export interface CompactSelectMeta extends CompactFormBasicSectionMeta {
    type: 'CompactSelect';
    titleComponent: true;
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

// uploader
export interface CompactUploaderMeta extends CompactFormBasicSectionMeta {
    type: 'CompactUploader';
    titleComponent: false;
    props?: {
        /** 标题 */
        title?: string;
        /** 副标题 */
        titleHint?: string;
        /** 是否显示星号 */
        required?: boolean;
        /** 用于发送上传请求 */
        httpRequest: (imageInfo: ImageInfo) => ImageInfo | Promise<ImageInfo>;
    };
}

export type CompactFormSectionMeta = CompactCascaderMeta | CompactInputMeta | CompactSelectMeta | CompactUploaderMeta;

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
