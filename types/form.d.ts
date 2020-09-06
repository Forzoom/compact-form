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
        placeholder?: string;
        type?: 'text' | 'tel';
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
