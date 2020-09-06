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

export interface ValueText {
    value: any;
    text: string;
}

export interface CascaderItem {
    id: number;
    name: string;
}
