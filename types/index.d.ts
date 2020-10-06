import { CombinedVueInstance, ExtendedVue } from 'vue/types/vue';
import { PropsDefinition, DefaultMethods, DefaultComputed } from 'vue/types/options';
import { ComponentOptions } from 'vue';
import { TitleMixin, PlaceholderMixin, CascaderItem, ValueText, ImageInfo } from './form';

export const Title: ExtendedVue<Vue, unknown, unknown, unknown, {
    title: string;
    required: boolean;
}>

export const Placeholder: ExtendedVue<Vue, {
    visible: boolean;
}, {
    onClickPlaceholder(): void;
}, unknown, {
    textAlign: string;
    placeholder: string;
}>

export const Validate: ExtendedVue<Vue, unknown, unknown, unknown, {
    isValidate: boolean;
}>

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

// date
type CompactDateProp = TitleMixin & PlaceholderMixin & {
    /** class */
    clazz?: string[];
    rightArrow?: boolean;
    minDate?: Date;
    maxDate?: Date;
    formatter?: any;
    type: 'date' | 'datetime' | 'time' | 'year-month' | 'month-day' | 'datehour';
}
export type CompactDateComponent = CombinedVueInstance<Vue, object, object, object, CompactDateProp>;
export type CompactDateComponentOptions = ComponentOptions<Vue, object, DefaultMethods<Vue>, DefaultComputed, PropsDefinition<CompactDateProp>, CompactDateProp>;

export const CompactDate: CompactDateComponentOptions;

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
