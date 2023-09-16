import { ICondition } from './form';

export interface IRule {
  fieldId?: string;
  ruleType: string;
  trigger: string;
  when: string; // 'if' | 'always';
  thenType: string;
  prop: string;
  propValue: string;
  conditions: ICondition[];
}
