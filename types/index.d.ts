import { CombinedVueInstance } from 'vue/types/vue';
import { PropsDefinition, DefaultMethods, DefaultComputed } from 'vue/types/options';
import { ComponentOptions } from 'vue';
import { CascaderItem, ValueText, ImageInfo } from './form';

// cascader
interface CompactCascaderProp {
    /** 是否显示星号 */
    required?: boolean;
    placeholder?: string;
    fetchList: <T extends CascaderItem>(item: T) => T[] | Promise<T[]>;
    /** class */
    clazz?: string[];
}
export type CompactCascaderComponent = CombinedVueInstance<Vue, object, object, object, CompactCascaderProp>;
export type CompactCascaderComponentOptions = ComponentOptions<Vue, object, DefaultMethods<Vue>, DefaultComputed, PropsDefinition<CompactCascaderProp>, CompactCascaderProp>;

export const CompactCascader: CompactCascaderComponentOptions;

// input
interface CompactInputProp {
    title?: string;
    /** 是否显示星号 */
    required?: boolean;
    placeholder?: string;
    type?: 'tel' | 'text';
    /** class */
    clazz?: string[];
}
export type CompactInputComponent = CombinedVueInstance<Vue, object, object, object, CompactInputProp>;
export type CompactInputComponentOptions = ComponentOptions<Vue, object, object, object, PropsDefinition<CompactInputProp>, CompactInputProp>;

export const CompactInput: CompactInputComponentOptions;

// select
interface CompactSelectProp {
    title?: string;
    /** 是否显示星号 */
    required?: boolean;
    placeholder?: string;
    /** 选项 */
    options?: ValueText[];
    /** class */
    clazz?: string[];
}
export type CompactSelectComponent = CombinedVueInstance<Vue, object, object, object, CompactSelectProp>;
export type CompactSelectComponentOptions = ComponentOptions<Vue, object, object, object, PropsDefinition<CompactSelectProp>, CompactSelectProp>;

export const CompactSelect: CompactSelectComponentOptions;

// textarea
interface CompactTextareaProp {
    /** 标题 */
    title?: string;
    /** 占位 */
    placeholder?: string;
    /** class */
    clazz?: string[];
}
export type CompactTextareaComponent = CombinedVueInstance<Vue, object, object, object, CompactTextareaProp>;
export type CompactTextareaComponentOptions = ComponentOptions<Vue, object, object, object, PropsDefinition<CompactTextareaProp>, CompactTextareaProp>;

export const CompactTextarea: CompactTextareaComponentOptions;

// uploader
interface CompactUploaderProp {
    title?: string;
    titleHint?: string;
    /** 是否显示星号 */
    required?: boolean;
    httpRequest: (imageInfo: ImageInfo) => ImageInfo | Promise<ImageInfo>;
    /** class */
    clazz?: string[];
}
export type CompactUploaderComponent = CombinedVueInstance<Vue, object, object, object, CompactUploaderProp>;
export type CompactUploaderComponentOptions = ComponentOptions<Vue, object, object, object, PropsDefinition<CompactUploaderProp>, CompactUploaderProp>;

export const CompactUploader: CompactUploaderComponentOptions;
