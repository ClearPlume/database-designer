import { ModalFormProps } from '@ant-design/pro-components';
import { Key } from 'react';

type Prop = {
  isNew: boolean;
} & ModalFormProps;

type Field = {
  id: Key;
  name: string;
  remark: string | null;
  type: string;
  length: number;
  scale: number;
  nullable: boolean;
  unique: boolean;
  primary: boolean;
  businessKey: boolean;
};

type Table = {
  name: string;
  remark: string | null;
  fields: Field[];
};
