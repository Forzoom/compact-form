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
