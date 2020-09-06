import { CombinedVueInstance } from 'vue/types/vue';
import { PropsDefinition, DefaultMethods, DefaultComputed } from 'vue/types/options';
import { ComponentOptions } from 'vue';
import { CascaderItem, ValueText } from './form';

// cascader
interface CompactCascaderProp {
    /** 是否显示星号 */
    required?: boolean;
    placeholder?: string;
    fetchList: <T extends CascaderItem>(item: T) => T[] | Promise<T[]>;
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
    clazz?: string[];
}
export type CompactSelectComponent = CombinedVueInstance<Vue, object, object, object, CompactSelectProp>;
export type CompactSelectComponentOptions = ComponentOptions<Vue, object, object, object, PropsDefinition<CompactSelectProp>, CompactSelectProp>;

export const CompactSelect: CompactSelectComponentOptions;
