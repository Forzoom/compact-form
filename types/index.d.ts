import { CombinedVueInstance } from 'vue/types/vue';
import { PropsDefinition } from 'vue/types/options';
import { ComponentOptions } from 'vue';

// cascader
interface CompactCascaderProp {
    placeholder?: string;
    fetchList: <T extends CascaderItem>(item: T) => T[] | Promise<T[]>;
}
export type CompactCascaderComponent = CombinedVueInstance<Vue, object, object, object, CompactCascaderProp>;
export type CompactCascaderComponentOptions = ComponentOptions<Vue, object, object, object, PropsDefinition<CompactCascaderProp>, CompactCascaderProp>;

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
