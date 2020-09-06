import { CombinedVueInstance } from 'vue/types/vue';
import { PropsDefinition, DefaultMethods, DefaultComputed } from 'vue/types/options';
import { ComponentOptions } from 'vue';
import { CascaderItem } from './form';

// cascader
interface CompactCascaderProp {
    /** 是否显示红星 */
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
    placeholder?: string;
    type?: 'tel' | 'text';
    clazz?: string[];
}
export type CompactInputComponent = CombinedVueInstance<Vue, object, object, object, CompactInputProp>;
export type CompactInputComponentOptions = ComponentOptions<Vue, object, object, object, PropsDefinition<CompactInputProp>, CompactInputProp>;

export const CompactInput: CompactInputComponentOptions;
