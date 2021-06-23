import { FormSection } from '@forzoom/form-renderer/types/form';

export interface TitleMixin {
    title?: string;
    required?: boolean;
}

export interface PlaceholderMixin {
    /** 文本对齐方式 */
    textAlign?: 'left' | 'center' | 'right';
    /** 占位内容 */
    placeholder?: string;
}

// cascader
export interface CompactCascaderMeta extends FormSection {
    type: 'CompactCascader';
    props: TitleMixin & PlaceholderMixin & {
        /** 获取列表数据 */
        fetchList: <T extends CascaderItem>(item: T) => T[] | Promise<T[]>;
        /** class */
        clazz?: string[];
        /** 是否显示右边的箭头 */
        rightArrow?: boolean;
        /** 是否禁用 */
        disabled?: boolean;
    };
}

// date
export interface CompactDateMeta extends FormSection {
    type: 'CompactDate';
    props: TitleMixin & PlaceholderMixin & {
        /** class */
        clazz?: string[];
        /** 是否显示右边的箭头 */
        rightArrow?: boolean;
        minDate?: Date;
        maxDate?: Date;
        formatter?: any;
        type: 'date' | 'datetime' | 'time' | 'year-month' | 'month-day' | 'datehour';
    };
}

// input
export interface CompactInputMeta extends FormSection {
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
        /** 是否禁用 */
        disabled?: boolean;
        /** 颜色 */
        color?: string;
    };
}

// select
export interface CompactSelectMeta extends FormSection {
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
        /** 是否禁用 */
        disabled?: boolean;
    };
}

// switch
export interface CompactSwitchMeta extends FormSection {
    type: 'CompactSwitch';
    props?: {
        title?: string;
        /** 是否显示星号 */
        required?: boolean;
        /** class */
        clazz?: string[];
        /** 对于switch的配置 */
        activeColor?: string;
        inactiveColor?: string;
        activeValue?: any;
        inactiveValue?: any;
    };
}

// textarea
export interface CompactTextareaMeta extends FormSection {
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
export interface CompactUploaderMeta extends FormSection {
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

export type CompactFormSectionMeta = CompactCascaderMeta | CompactDateMeta | CompactInputMeta | CompactSelectMeta | CompactSwitchMeta | CompactTextareaMeta | CompactUploaderMeta;

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
