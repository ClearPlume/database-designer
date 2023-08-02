import type { Key } from 'react';
import React, { useState } from 'react';
import { Button, Form } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import type { Field, Prop, Table } from './type';

import './index.module.less';

const MutateTable: React.FC<Prop> = ({ isNew, ...props }) => {
  const [fieldForm] = Form.useForm<Field>();
  const [editableKeys, setEditableKeys] = useState<Key[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  const columns: ProColumns<Field>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true, message: '字段名不可为空' }],
      },
    },
    {
      title: '注释',
      dataIndex: 'remark',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      width: 170,
      fieldProps: {
        style: { width: 150 },
        options: [
          { label: 'boolean', value: 0 },
          { label: 'char', value: 1 },
          { label: 'nchar', value: 2 },
          { label: 'varchar', value: 3 },
          { label: 'date', value: 4 },
          { label: 'time', value: 5 },
          { label: 'datetime', value: 6 },
          { label: 'timestamp', value: 7 },
          { label: 'decimal', value: 8 },
          { label: 'double', value: 9 },
          { label: 'float', value: 10 },
          { label: 'int', value: 11 },
          { label: 'mediumint', value: 12 },
          { label: 'smallint', value: 13 },
          { label: 'tinyint', value: 14 },
          { label: 'number', value: 15 },
        ],
      },
      formItemProps: {
        rules: [{ required: true, message: '字段类型不可为空' }],
      },
    },
    {
      title: '长度',
      dataIndex: 'length',
      valueType: 'digit',
      width: 110,
      formItemProps: {
        rules: [{ required: true, message: '类型长度不可为空' }],
      },
    },
    {
      title: '小数位',
      valueType: 'digit',
      dataIndex: 'scale',
      width: 110,
    },
    {
      title: '可空性',
      valueType: 'switch',
      dataIndex: 'nullable',
      width: 80,
    },
    {
      title: '唯一性',
      valueType: 'switch',
      dataIndex: 'unique',
      width: 80,
    },
    {
      title: '主键',
      valueType: 'switch',
      dataIndex: 'primary',
      width: 80,
    },
    {
      title: '业务键',
      valueType: 'switch',
      dataIndex: 'businessKey',
      width: 80,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 130,
      render: (_text, record, _index, action) => [
        <Button
          type={'link'}
          size={'small'}
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </Button>,
        <Button
          type={'link'}
          size={'small'}
          key="delete"
          onClick={() => {
            setFields(fields.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  // noinspection JSUnusedGlobalSymbols
  return (
    // @ts-ignore
    <ModalForm<Table>
      {...props}
      title={`${isNew ? '新建' : '编辑'}表`}
      width={'90%'}
      layout={'horizontal'}
      labelCol={{ span: 1 }}
      modalProps={{
        maskClosable: false,
        destroyOnClose: true,
        bodyStyle: { maxHeight: '520px', overflowY: 'auto' },
      }}
      autoFocusFirstInput={true}
      onFinish={(values) => {
        console.log('表单数据: ', values);
        return Promise.resolve();
      }}
    >
      <ProFormText
        name={'name'}
        label={'表名'}
        placeholder={'请输入表名'}
        rules={[{ required: true, message: '表名不可为空' }]}
      />
      <ProFormTextArea
        name={'remark'}
        label={'表备注'}
        placeholder={'请输入表备注'}
        allowClear={true}
        transform={(value: string | null, _namePath, allValues: Table) => {
          return {
            ...allValues,
            remark: value !== null && value.length === 0 ? null : value,
          };
        }}
      />
      <ProForm.Item
        name={'fields'}
        label={'字段'}
        rules={[
          { required: true, message: '一张表需要有至少一个字段' },
          {
            validator: () => {
              if (editableKeys.length > 0) {
                return Promise.reject(new Error('有正在编辑的字段，不可保存'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <EditableProTable<Field>
          size={'small'}
          rowKey={'id'}
          columns={columns}
          recordCreatorProps={{
            creatorButtonText: '添加一个字段',
            record: (): Field => {
              return {
                id: Date.now(),
                name: '',
                remark: null,
                type: '',
                length: 0,
                scale: 0,
                nullable: false,
                unique: false,
                primary: false,
                businessKey: false,
              };
            },
          }}
          editable={{
            editableKeys,
            form: fieldForm,
            onlyAddOneLineAlertMessage: '只能同时新增一行',
            onSave: async (_key, data) => {
              const valid = await fieldForm.validateFields();
              if (valid) {
                setFields([...fields, data]);
                return Promise.resolve();
              }
              return Promise.reject();
            },
            onChange: (keys: React.Key[]) => setEditableKeys(keys),
          }}
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default MutateTable;
